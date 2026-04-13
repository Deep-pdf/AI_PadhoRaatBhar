# AI Padho Raato Raat

A small full-stack app for tracking a **dated AI/ML study curriculum**: upload a spreadsheet (or bootstrap from local data), see **today’s focus**, **progress and streaks**, mark days **done**, and open **topic-based daily practice** (curated prompts and sample code—no external AI APIs).

## What’s inside

| Part | Tech |
|------|------|
| **API** | [FastAPI](https://fastapi.tiangolo.com/), [pandas](https://pandas.pydata.org/), [openpyxl](https://openpyxl.readthedocs.io/) (Excel) |
| **UI** | [React](https://react.dev/) 19, [Vite](https://vite.dev/) 8, [Tailwind CSS](https://tailwindcss.com/) 3 |

The frontend talks to the API at `http://localhost:8000` (see `frontend/src/App.jsx`). The backend enables CORS for local development.

## Repository layout

```
backend/          # FastAPI app, data.json, practice content
frontend/         # Vite + React dashboard
```

## Prerequisites

- **Python** 3.10+ (3.11+ recommended) with `pip`
- **Node.js** 18+ and npm (for the frontend)

## Quick start

### 1. Backend

```bash
cd backend
python -m venv .venv
```

Activate the venv (Windows PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

Install and run:

```bash
pip install -r requirements.txt
python main.py
```

The server listens on **http://127.0.0.1:8000** (or `http://localhost:8000`).

On startup, tasks are loaded from `backend/data.json` if it exists. If not, the app may try to import a workbook path configured in `backend/main.py` (`EXCEL_FILE`) and then write `data.json`. You can always **upload** a plan from the UI instead.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (typically **http://localhost:5173**).

## Using the app

1. **Upload a curriculum** (`.xlsx` or `.csv`) from the dashboard. The backend validates and normalizes rows.
2. **Activate a plan** (the UI can keep multiple plans in `localStorage` and sync the active one to the server via `/set-active-plan`).
3. View **today’s task** (`/today`), the full table (`/all`), and **stats** (`/stats`).
4. Mark the current day **complete** or **pending**; streaks use weekday rows in order (see `/stats` implementation in `backend/main.py`).
5. Open **Daily practice** for the active topic; content comes from `backend/practice_generator.py` (deterministic map + generic fallback for unknown topics).

## Spreadsheet format

**Required columns** (names are normalized from common aliases):

| Column | Description |
|--------|-------------|
| `Date` | Recognizable date (e.g. `2026-04-06`, `06-04-2026`, Excel date cells) |
| `Topic` | Short label (used for practice lookup) |
| `Task` | What to do that day |
| `Resource` | Link or reference |

**Optional columns:** `Status`, `Done?`, `Notes`, `Hours`, `Day` (if `Day` is missing, the server derives it from the date).

Rows missing date, topic, task, or resource are dropped during import.

## HTTP API (summary)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/all` | Full task list |
| `GET` | `/today` | Today’s row, or next pending, or a message if none |
| `GET` | `/stats` | Totals, completion %, weekday streak |
| `GET` | `/practice` | Practice questions + snippet for current topic |
| `POST` | `/upload` | Multipart file upload (`.xlsx` / `.csv`) → normalized `data` + `preview` |
| `POST` | `/set-active-plan` | JSON `{ "tasks": [ ... ] }` replaces in-memory plan |
| `POST` | `/complete` | JSON `{ "date": "YYYY-MM-DD" }` marks that date done |
| `POST` | `/uncomplete` | JSON `{ "date": "YYYY-MM-DD" }` marks pending |

Interactive docs: **http://localhost:8000/docs** (Swagger UI).

## Scripts (frontend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `frontend/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |

## Data notes

- **In-memory + file:** The running API keeps tasks in memory (`active_tasks_data`). Upload and `/set-active-plan` update that list; completing tasks updates it in place. Persisting to `data.json` on every change is not wired in the current code—if you need durability across restarts, save from the UI (plans in `localStorage`) and **POST `/set-active-plan`** after restart, or extend the backend to call `save_data` where appropriate.
- **Security:** CORS is `allow_origins=["*"]` and the stack is intended for **local/trusted** use. Do not expose this blindly on the public internet without hardening.

## License

No license file is present in this repository. Add one if you plan to distribute or collaborate.
