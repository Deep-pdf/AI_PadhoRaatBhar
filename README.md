# AI Padho Raato Raat + JaldiBatao AI

A full-stack web application designed for two main purposes:
1. **Curriculum Tracker**: Track a dated AI/ML study curriculum by uploading a spreadsheet. View today’s focus, monitor progress/streaks, mark days done, and access topic-based daily practice (curated prompts and sample code).
2. **JaldiBatao AI**: A modern, mobile-responsive AI chat interface powered by the Google Gemini API to assist with your learning and coding queries directly in the app.

## What’s inside

| Part | Tech |
|------|------|
| **API** | [FastAPI](https://fastapi.tiangolo.com/), [pandas](https://pandas.pydata.org/), [openpyxl](https://openpyxl.readthedocs.io/) (Excel) |
| **UI** | [React](https://react.dev/) 19, [Vite](https://vite.dev/) 8, [Tailwind CSS](https://tailwindcss.com/) 3, Framer Motion |
| **AI Integration** | [Google Gemini API](https://ai.google.dev/) via `@google/generative-ai` |

## Repository layout

```
backend/          # FastAPI app, data.json, practice content
frontend/         # Vite + React dashboard, JaldiBatao AI Chat UI
```

## Features

- **Progress Dashboard**: Upload a curriculum (`.xlsx` or `.csv`), view stats, and mark tasks complete.
- **Learning Paths**: Manage multiple training plans locally via `localStorage`.
- **Daily Practice**: Auto-generated practice coding questions based on the active topic.
- **JaldiBatao AI Chat**: A sleek, full-screen Gemini-powered chat assistant.
  - **Local API Key Security**: Your Gemini API key is securely saved directly in your browser's `localStorage` and is *never* sent to the backend. Manage keys directly in the app's settings.
- **Mobile Responsive Layout**: Optimized for both desktop and mobile, with bottom navigation tabs and a seamless hamburger menu for smaller screens.

## Prerequisites

- **Python** 3.10+ (3.11+ recommended) with `pip`
- **Node.js** 18+ and npm (for the frontend)
- (Optional but recommended) **Google Gemini API Key** for JaldiBatao AI chat.

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
2. **Activate a plan** (the UI keeps multiple plans in `localStorage` and syncs the active one to the server).
3. **Set API Key**: Go to the API Keys section via the navigation menu to input your Google Gemini API Key.
4. **Chat with JaldiBatao AI**: Open the AI Chat view and ask questions related to your curriculum.
5. **Mark Progress**: Mark the current learning day complete or pending. Open Daily Practice for curated content.

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

## Scripts (frontend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `frontend/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |

## Data notes

- **In-memory + file:** The running API keeps tasks in memory (`active_tasks_data`). Upload and `/set-active-plan` update that list. Persisting to `data.json` on every change is not wired in the current code setup automatically unless you use the UI. Use the frontend app to save plans into `localStorage`.
- **API Key Security**: The Gemini API calls happen securely client-side. The backend is completely unaware of the AI chat traffic.
- **Security:** CORS is `allow_origins=["*"]` on the backend. This stack is intended for **local/trusted** use. Do not expose this blindly on the public internet.

## License

No license file is present in this repository. Add one if you plan to distribute or collaborate.
