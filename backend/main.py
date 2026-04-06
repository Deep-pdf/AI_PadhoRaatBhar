import io
import json
import os
import math
import re
from datetime import datetime, date
from typing import Any

import pandas as pd
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from practice_generator import generate_practice

app = FastAPI(title="AI/ML Learning Tracker API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data.json"
EXCEL_FILE = "../AI_ML_6M_Antigravity_Ready.xlsx"
REQUIRED_COLUMNS = ["Date", "Topic", "Task", "Resource"]
OPTIONAL_COLUMNS = ["Status", "Done?", "Notes", "Hours", "Day"]

def _normalize_col_token(name: str) -> str:
    token = re.sub(r"[^a-z0-9]", "", str(name or "").strip().lower())
    if token.endswith("s") and len(token) > 1:
        token = token[:-1]
    return token


def _canonical_column_name(raw_name: str):
    token = _normalize_col_token(raw_name)
    aliases = {
        "date": "Date",
        "day": "Day",
        "topic": "Topic",
        "task": "Task",
        "resource": "Resource",
        "status": "Status",
        "done": "Done?",
        "done?": "Done?",
        "note": "Notes",
        "notes": "Notes",
        "hour": "Hours",
        "hours": "Hours",
    }
    return aliases.get(token)


def _canonicalize_dataframe_columns(df: pd.DataFrame):
    rename_map = {}
    for col in df.columns:
        canonical = _canonical_column_name(str(col))
        if canonical and canonical not in rename_map.values():
            rename_map[col] = canonical
    return df.rename(columns=rename_map)


def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            raw = json.load(f)
            return _normalize_task_list(raw)
    elif os.path.exists(EXCEL_FILE):
        df = pd.read_excel(EXCEL_FILE)
        records = df.to_dict(orient="records")
        normalized = _normalize_task_list(records)
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(normalized, f, indent=4)
        return normalized
    else:
        return []

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def _boolify_done(value):
    if isinstance(value, bool):
        return value
    if value is None:
        return False
    return str(value).strip().lower() in {"yes", "true", "1", "done", "completed"}


def _parse_upload_date(value):
    """Flexible upload parser; avoid forced day-first flips for ambiguous strings."""
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value

    raw = str(value or "").strip()
    if not raw:
        return None

    date_part = raw.split("T")[0].strip()

    parsed = pd.to_datetime(date_part, errors="coerce")
    if pd.notna(parsed):
        return parsed.date()
    return None


def _parse_mixed_date(value):
    """Internal parser for normalized/legacy rows used by runtime endpoints."""
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value

    raw = str(value or "").strip()
    if not raw:
        return None

    date_part = raw.split("T")[0].split(" ")[0]
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", date_part):
        try:
            return datetime.strptime(date_part, "%Y-%m-%d").date()
        except ValueError:
            return None
    if re.fullmatch(r"\d{2}-\d{2}-\d{4}", date_part):
        try:
            return datetime.strptime(date_part, "%d-%m-%Y").date()
        except ValueError:
            return None
    if re.fullmatch(r"\d{2}/\d{2}/\d{4}", date_part):
        try:
            return datetime.strptime(date_part, "%d/%m/%Y").date()
        except ValueError:
            return None
    return None


def _normalize_dataframe(df: pd.DataFrame):
    raw_columns = [str(c).strip() for c in df.columns]
    df.columns = raw_columns
    df = _canonicalize_dataframe_columns(df)

    missing_required = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing_required:
        missing_text = ", ".join(missing_required)
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "MISSING_REQUIRED_COLUMNS",
                    "message": f"Missing required columns: {missing_text}",
                    "missing": missing_required,
                    "required": REQUIRED_COLUMNS,
                }
            },
        )

    parsed_dates = df["Date"].apply(_parse_upload_date)
    invalid_date_rows = [int(i) + 2 for i, d in enumerate(parsed_dates.tolist()) if d is None]
    if invalid_date_rows:
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "INVALID_DATE_FORMAT",
                    "message": "Invalid dates found. Use recognizable date values (e.g. 2026-04-06, 06-04-2026, 04/06/2026, or Excel date cells).",
                    "rows": invalid_date_rows[:25],
                }
            },
        )
    normalized = pd.DataFrame(
        {
            "Date": parsed_dates.apply(lambda d: d.strftime("%Y-%m-%d") if d else None),
            "Topic": df["Topic"].astype(str).str.strip(),
            "Task": df["Task"].astype(str).str.strip(),
            "Resource": df["Resource"].astype(str).str.strip(),
        }
    )

    if "Status" in df.columns:
        normalized["Status"] = df["Status"]
    else:
        normalized["Status"] = "Pending"

    if "Done?" in df.columns:
        normalized["Done?"] = df["Done?"].apply(_boolify_done)
    else:
        normalized["Done?"] = False

    if "Notes" in df.columns:
        normalized["Notes"] = df["Notes"]
    else:
        normalized["Notes"] = ""

    if "Hours" in df.columns:
        normalized["Hours"] = pd.to_numeric(df["Hours"], errors="coerce")
    else:
        normalized["Hours"] = 2

    if "Day" in df.columns:
        normalized["Day"] = df["Day"]
    else:
        normalized["Day"] = normalized["Date"].apply(
            lambda d: datetime.strptime(d, "%Y-%m-%d").strftime("%a") if d else ""
        )

    normalized["Status"] = normalized["Status"].fillna("Pending").astype(str).str.strip()
    normalized["Done?"] = normalized["Done?"].fillna(False).apply(_boolify_done)
    normalized["Notes"] = normalized["Notes"].fillna("").astype(str)
    normalized["Hours"] = normalized["Hours"].fillna(2)
    normalized["Resource"] = normalized["Resource"].replace("nan", "").replace("None", "")
    normalized["Topic"] = normalized["Topic"].replace("nan", "").replace("None", "")
    normalized["Task"] = normalized["Task"].replace("nan", "").replace("None", "")

    valid_mask = (
        normalized["Date"].notna()
        & (normalized["Topic"] != "")
        & (normalized["Task"] != "")
        & (normalized["Resource"] != "")
    )
    # Keep source Excel row order; do not reorder in backend.
    cleaned = normalized[valid_mask].copy()

    records = cleaned.to_dict(orient="records")
    for r in records:
        for k, v in r.items():
            if isinstance(v, float) and math.isnan(v):
                r[k] = None
        if r.get("Status") in ("", None):
            r["Status"] = "Pending"
        r["Done?"] = _boolify_done(r.get("Done?"))
        if r.get("Hours") in ("", None):
            r["Hours"] = 2
        if r.get("Notes") is None:
            r["Notes"] = ""

    preview = [{k: row.get(k) for k in REQUIRED_COLUMNS} for row in records[:10]]
    return records, preview, len(df.index), len(records)


def _normalize_task_list(tasks):
    """Normalize incoming plan rows to stable ISO date while preserving row order."""
    if not isinstance(tasks, list):
        return []

    normalized = []
    for row in tasks:
        if not isinstance(row, dict):
            continue

        parsed = _parse_mixed_date(row.get("Date"))
        if parsed is None:
            continue

        item = dict(row)
        item["Date"] = parsed.strftime("%Y-%m-%d")
        item["Status"] = str(item.get("Status") or "Pending").strip() or "Pending"
        item["Done?"] = _boolify_done(item.get("Done?"))
        if item.get("Notes") is None:
            item["Notes"] = ""
        if item.get("Hours") in ("", None):
            item["Hours"] = 2

        if not item.get("Day"):
            item["Day"] = parsed.strftime("%a")

        normalized.append(item)

    return normalized


# Active in-memory dataset used by /today, /all, /stats, /complete, /uncomplete.
active_tasks_data = load_data()


def _is_done(task: dict[str, Any]) -> bool:
    return _boolify_done(task.get("Done?"))


def _resolve_today_or_next_pending(tasks):
    """Select today's row, else nearest upcoming pending, else first pending."""
    today = datetime.now().date()
    for task in tasks:
        parsed = _parse_mixed_date(task.get("Date"))
        if parsed == today:
            return task

    upcoming = []
    for task in tasks:
        if _is_done(task):
            continue
        parsed = _parse_mixed_date(task.get("Date"))
        if parsed is not None and parsed >= today:
            upcoming.append((parsed, task))

    if upcoming:
        upcoming.sort(key=lambda x: x[0])
        return upcoming[0][1]

    for task in tasks:
        if not _is_done(task):
            return task
    return None


@app.get("/all")
def get_all_tasks():
    return active_tasks_data


class ActivePlanRequest(BaseModel):
    tasks: list[dict]


@app.post("/set-active-plan")
def set_active_plan(req: ActivePlanRequest):
    global active_tasks_data
    active_tasks_data = _normalize_task_list(req.tasks or [])
    return {"status": "ok", "count": len(active_tasks_data)}


@app.post("/upload")
async def upload_plan(file: UploadFile = File(...)):
    file_name = (file.filename or "").lower()
    if not (file_name.endswith(".xlsx") or file_name.endswith(".csv")):
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "INVALID_FILE_TYPE",
                    "message": "Only .xlsx and .csv files are supported.",
                }
            },
        )

    content = await file.read()
    if not content:
        raise HTTPException(
            status_code=400,
            detail={"error": {"code": "EMPTY_FILE", "message": "Uploaded file is empty."}},
        )

    try:
        if file_name.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        else:
            df = pd.read_excel(io.BytesIO(content))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "PARSE_ERROR",
                    "message": "Could not parse file. Please upload a valid CSV or XLSX.",
                }
            },
        )

    records, preview, total_rows, valid_rows = _normalize_dataframe(df)
    if not records:
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "NO_VALID_ROWS",
                    "message": "No valid rows found after normalization.",
                }
            },
        )

    return {
        "status": "ok",
        "fileName": file.filename,
        "totalRows": total_rows,
        "validRows": valid_rows,
        "preview": preview,
        "data": records,
    }

@app.get("/today")
def get_today_task():
    task = _resolve_today_or_next_pending(active_tasks_data)
    if task is None:
        return {"message": "No task for today or pending tasks found."}
    return {
        "Date": task.get("Date"),
        "Topic": task.get("Topic"),
        "Task": task.get("Task"),
        "Resource": task.get("Resource"),
        "Status": task.get("Status"),
        "Done?": task.get("Done?"),
    }


@app.get("/practice")
def get_practice():
    task = _resolve_today_or_next_pending(active_tasks_data)
    if task is None:
        raise HTTPException(
            status_code=404,
            detail="No task for today or pending tasks found.",
        )
    topic = task.get("Topic") or "General"
    content = generate_practice(topic)
    raw_date = str(task.get("Date", ""))
    date_out = raw_date[:10] if len(raw_date) >= 10 else raw_date
    return {
        "date": date_out,
        "topic": topic,
        "questions": content["questions"],
        "code": content["code"],
    }

class CompleteRequest(BaseModel):
    date: str

@app.post("/complete")
def complete_task(req: CompleteRequest):
    updated = False
    for task in active_tasks_data:
        if str(task.get("Date")) == req.date:
            task["Done?"] = True
            task["Status"] = "Completed"
            updated = True
            break
            
    if updated:
        return {"status": "success", "message": "Task marked as completed."}
    raise HTTPException(status_code=404, detail="Task not found for the given date.")

@app.post("/uncomplete")
def uncomplete_task(request: CompleteRequest):
    for task in active_tasks_data:
        if task.get("Date") == request.date:
            task["Done?"] = False
            task["Status"] = "Pending"
            return {"message": "Task marked as pending successfully", "task": task}
            
    raise HTTPException(status_code=404, detail="Task not found")

@app.get("/stats")
def get_stats():
    total_days = len(active_tasks_data)
    current_streak = 0
    completed_days = 0
    
    for task in active_tasks_data:
        if _is_done(task):
            completed_days += 1

    sorted_tasks = sorted(
        active_tasks_data,
        key=lambda t: _parse_mixed_date(t.get("Date")) or date.min,
    )
    valid_tasks = []
    for t in sorted_tasks:
        dt = _parse_mixed_date(t.get("Date"))
        if dt is None:
            continue
        if dt.weekday() < 5:
            valid_tasks.append(t)
    
    last_completed_idx = -1
    for i in range(len(valid_tasks) - 1, -1, -1):
        if _is_done(valid_tasks[i]):
            last_completed_idx = i
            break
            
    if last_completed_idx != -1:
        for i in range(last_completed_idx, -1, -1):
            if _is_done(valid_tasks[i]):
                current_streak += 1
            else:
                break

    # Ensure total_days > 0 to prevent division by zero
    progress_percentage = (completed_days / total_days * 100) if total_days > 0 else 0
    remaining_days = total_days - completed_days
    
    return {
        "total_days": total_days,
        "completed_days": completed_days,
        "remaining_days": remaining_days,
        "progress_percentage": round(progress_percentage, 1),
        "current_streak": current_streak
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
