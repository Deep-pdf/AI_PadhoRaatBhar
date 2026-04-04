import json
import os
import pandas as pd
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math

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

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    elif os.path.exists(EXCEL_FILE):
        df = pd.read_excel(EXCEL_FILE)
        
        # Convert date to string if it is datetime
        if 'Date' in df.columns:
            df['Date_str'] = pd.to_datetime(df['Date'], errors='coerce').dt.strftime('%Y-%m-%d')
            # fallback to string if datetime fails
            df['Date_str'] = df['Date_str'].fillna(df['Date'].astype(str))
            df['Date'] = df['Date_str']
            df.drop(columns=['Date_str'], inplace=True)
            
        records = df.to_dict(orient="records")
        for r in records:
            for k, v in r.items():
                if isinstance(v, float) and math.isnan(v):
                    r[k] = None
            if r.get('Done?') is None:
                r['Done?'] = 'No'
            if r.get('Status') is None:
                r['Status'] = 'Pending'
                
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(records, f, indent=4)
        return records
    else:
        return []

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Load data at startup
tasks_data = load_data()

@app.get("/all")
def get_all_tasks():
    return tasks_data

@app.get("/today")
def get_today_task():
    today_str = datetime.now().strftime("%Y-%m-%d")
    for task in tasks_data:
        # Date formats might be simple strings, try matching
        if str(task.get('Date', '')).startswith(today_str):
            return {
                "Date": task.get("Date"),
                "Topic": task.get("Topic"),
                "Task": task.get("Task"),
                "Resource": task.get("Resource"),
                "Status": task.get("Status"),
                "Done?": task.get("Done?")
            }
    
    # If no task matches today's exact date, find the first upcoming or pending task
    for task in tasks_data:
        if task.get("Done?") != "Yes":
           return {
                "Date": task.get("Date"),
                "Topic": task.get("Topic"),
                "Task": task.get("Task"),
                "Resource": task.get("Resource"),
                "Status": task.get("Status"),
                "Done?": task.get("Done?")
            }
            
    return {"message": "No task for today or pending tasks found."}

class CompleteRequest(BaseModel):
    date: str

@app.post("/complete")
def complete_task(req: CompleteRequest):
    global tasks_data
    updated = False
    for task in tasks_data:
        if str(task.get("Date")) == req.date:
            task["Done?"] = "Yes"
            task["Status"] = "Completed"
            updated = True
            break
            
    if updated:
        save_data(tasks_data)
        return {"status": "success", "message": "Task marked as completed."}
    raise HTTPException(status_code=404, detail="Task not found for the given date.")

@app.post("/uncomplete")
def uncomplete_task(request: CompleteRequest):
    for task in tasks_data:
        if task.get("Date") == request.date:
            task["Done?"] = "No"
            task["Status"] = "Pending"
            
            # Save state
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump(tasks_data, f, indent=4)
                
            return {"message": "Task marked as pending successfully", "task": task}
            
    raise HTTPException(status_code=404, detail="Task not found")

@app.get("/stats")
def get_stats():
    total_days = len(tasks_data)
    current_streak = 0
    completed_days = 0
    
    for task in tasks_data:
        if task.get("Done?") == "Yes":
            completed_days += 1
            
    valid_tasks = [t for t in tasks_data if str(t.get("Day", "")).strip()[:3].lower() not in ["sat", "sun"]]
    
    last_completed_idx = -1
    for i in range(len(valid_tasks) - 1, -1, -1):
        if valid_tasks[i].get("Done?") == "Yes":
            last_completed_idx = i
            break
            
    if last_completed_idx != -1:
        for i in range(last_completed_idx, -1, -1):
            if valid_tasks[i].get("Done?") == "Yes":
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
