import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MobileBottomNav from './components/MobileBottomNav';
import HeroMission from './components/HeroMission';
import StatsGrid from './components/StatsGrid';
import DataTable from './components/DataTable';
import CurriculumView from './components/CurriculumView';
import DailyPractice from './components/DailyPractice';
import { formatDateDDMMYYYY } from './utils/dateFormat';

const API_BASE = 'http://localhost:8000';
const STORAGE_KEY = 'training_plans';
const ACTIVE_PLAN_KEY = 'active_plan_id';

function App() {
  const [todayTask, setTodayTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewPayload, setPreviewPayload] = useState(null);
  const [plans, setPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState('');
  const [uiError, setUiError] = useState('');
  const fileInputRef = useRef(null);

  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'learning_paths'

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const savePlansToStorage = (nextPlans, nextActiveId) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlans));
    if (nextActiveId) localStorage.setItem(ACTIVE_PLAN_KEY, nextActiveId);
  };

  const fetchActiveData = async () => {
    try {
      const [todayRes, allRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/today`),
        fetch(`${API_BASE}/all`),
        fetch(`${API_BASE}/stats`)
      ]);
      
      const todayData = await safeJson(todayRes);
      const allData = await safeJson(allRes);
      const statsData = await safeJson(statsRes);
      
      setTodayTask(todayData && !todayData.message ? todayData : null);
      setAllTasks(Array.isArray(allData) ? allData : []);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const activatePlan = async (plan) => {
    if (!plan) return;
    setActivePlanId(plan.id);
    localStorage.setItem(ACTIVE_PLAN_KEY, plan.id);
    setProcessing(true);
    setUiError('');
    try {
      const syncRes = await fetch(`${API_BASE}/set-active-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: plan.data || [] }),
      });
      if (!syncRes.ok) throw new Error('Could not activate selected plan.');
      await fetchActiveData();
    } catch (err) {
      setUiError(err.message || 'Failed to activate plan.');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsedPlans = raw ? JSON.parse(raw) : [];
    const existingPlans = Array.isArray(parsedPlans) ? parsedPlans : [];
    setPlans(existingPlans);

    if (existingPlans.length === 0) {
      setTodayTask(null);
      setAllTasks([]);
      setStats({ total_days: 0, completed_days: 0, remaining_days: 0, progress_percentage: 0, current_streak: 0 });
      return;
    }

    const lastActiveId = localStorage.getItem(ACTIVE_PLAN_KEY);
    const targetPlan = existingPlans.find((p) => p.id === lastActiveId) || existingPlans[0];
    activatePlan(targetPlan);
  }, []);

  const handleFilePicked = (file) => {
    if (!file) return;
    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.xlsx') && !lower.endsWith('.csv')) {
      setUiError('Invalid file. Please upload .xlsx or .csv');
      return;
    }
    processUpload(file);
  };

  const processUpload = async (file) => {
    setUiError('');
    setProcessing(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: form });
      const payload = await safeJson(res);
      if (!res.ok) {
        const errorObj = payload?.detail?.error;
        const missingCols = Array.isArray(errorObj?.missing) ? errorObj.missing : [];
        let msg = errorObj?.message || payload?.detail || 'Upload failed';
        if (errorObj?.code === 'MISSING_REQUIRED_COLUMNS' && missingCols.length > 0) {
          msg = `Missing required columns: ${missingCols.join(', ')}`;
        }
        throw new Error(msg);
      }
      setPreviewPayload(payload);
    } catch (err) {
      setUiError(err.message || 'Upload failed');
    } finally {
      setProcessing(false);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const confirmAndSavePlan = async () => {
    if (!previewPayload?.data) return;
    const nextPlan = {
      id: `${Date.now()}`,
      name: previewPayload.fileName || 'training-plan',
      uploadDate: new Date().toISOString(),
      data: previewPayload.data,
    };
    const nextPlans = [nextPlan, ...plans].slice(0, 3);
    setPlans(nextPlans);
    savePlansToStorage(nextPlans, nextPlan.id);
    setPreviewPayload(null);
    await activatePlan(nextPlan);
  };

  const cancelPreview = () => {
    setPreviewPayload(null);
  };

  const handleCompleteTask = async (date) => {
    const currentPlan = plans.find((p) => p.id === activePlanId);
    if (!currentPlan) return;
    const updatedData = currentPlan.data.map((t) => (
      String(t.Date) === String(date) ? { ...t, 'Done?': true, Status: 'Completed' } : t
    ));
    const updatedPlans = plans.map((p) => (p.id === activePlanId ? { ...p, data: updatedData } : p));
    setPlans(updatedPlans);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
    setAllTasks(updatedData);

    try {
      const res = await fetch(`${API_BASE}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      });
      
      if (res.ok) await fetchActiveData();
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleUndoTask = async (date) => {
      const currentPlan = plans.find((p) => p.id === activePlanId);
      if (!currentPlan) return;
      const updatedData = currentPlan.data.map((t) => (
        String(t.Date) === String(date) ? { ...t, 'Done?': false, Status: 'Pending' } : t
      ));
      const updatedPlans = plans.map((p) => (p.id === activePlanId ? { ...p, data: updatedData } : p));
      setPlans(updatedPlans);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
      setAllTasks(updatedData);
      try {
        const res = await fetch(`${API_BASE}/uncomplete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date })
        });
        if (res.ok) await fetchActiveData();
      } catch (err) {
          console.error("Network error:", err);
      }
  };

  const loadPlanById = async (id) => {
    const plan = plans.find((p) => p.id === id);
    if (!plan) return;
    await activatePlan(plan);
  };

  const deletePlanById = async (id) => {
    const plan = plans.find((p) => p.id === id);
    if (!plan) return;
    const ok = window.confirm(`Delete plan "${plan.name}"? This cannot be undone.`);
    if (!ok) return;

    const nextPlans = plans.filter((p) => p.id !== id);
    setPlans(nextPlans);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlans));

    const wasActive = String(activePlanId) === String(id);
    if (!wasActive) return;

    const nextActive = nextPlans[0];
    if (nextActive) {
      await activatePlan(nextActive);
      return;
    }

    setActivePlanId('');
    localStorage.removeItem(ACTIVE_PLAN_KEY);
    setTodayTask(null);
    setAllTasks([]);
    setStats({ total_days: 0, completed_days: 0, remaining_days: 0, progress_percentage: 0, current_streak: 0 });
    try {
      await fetch(`${API_BASE}/set-active-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: [] }),
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden font-body bg-[#0E0E0F]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.csv"
        className="hidden"
        onChange={(e) => handleFilePicked(e.target.files?.[0])}
      />
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNewTrainingRun={openFilePicker}
        onDropFile={handleFilePicked}
        recentPlans={plans}
        activePlanId={activePlanId}
        onLoadPlan={loadPlanById}
        onDeletePlan={deletePlanById}
      />
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10">
        <TopNav
          currentView={currentView}
          setCurrentView={setCurrentView}
          onNewTrainingRun={openFilePicker}
          recentPlans={plans}
          activePlanId={activePlanId}
          onLoadPlan={loadPlanById}
          onDeletePlan={deletePlanById}
        />
        <div className="mt-16 p-4 md:p-6 lg:p-8 space-y-5 md:space-y-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(109,40,217,0.5)]"></div>
                </div>
            ) : plans.length === 0 ? (
                <section className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter mb-3">Start a New Training Run</h2>
                  <p className="text-on-surface-variant text-sm mb-6">Upload a CSV or XLSX. You can store up to 3 recent plans locally.</p>
                  <button onClick={openFilePicker} className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container text-white font-semibold">
                    New Training Run
                  </button>
                </section>
            ) : currentView === 'dashboard' ? (
                <>
                    <HeroMission todayTask={todayTask} progress={stats?.progress_percentage} />
                    <StatsGrid stats={stats} setCurrentView={setCurrentView} />
                    {/* Read-only table for Dashboard */}
                    <DataTable tasks={allTasks} onComplete={() => {}} readOnly={true} highlightedDate={todayTask?.Date} />
                </>
            ) : currentView === 'learning_paths' ? (
                <CurriculumView tasks={allTasks} onComplete={handleCompleteTask} onUndo={handleUndoTask} stats={stats} highlightedDate={todayTask?.Date} />
            ) : currentView === 'practice' ? (
                <DailyPractice apiBase={API_BASE} onMarkPracticed={handleCompleteTask} />
            ) : null}

            {uiError && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
                {uiError}
              </div>
            )}
            
            <footer className="w-full mt-auto py-8 md:py-12 flex flex-col items-center gap-3 md:gap-4 px-4 md:px-8 border-t border-[#4a4455]/20 bg-[#0A0A0B] rounded-2xl mb-4 md:mb-8">
                <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
                    <a className="text-[#4a4455] text-[0.6rem] md:text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors" href="#">Privacy Policy</a>
                    <a className="text-[#4a4455] text-[0.6rem] md:text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors" href="#">Terms of Service</a>
                    <a className="text-[#4a4455] text-[0.6rem] md:text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors" href="#">Changelog</a>
                </div>
                <p className="text-[#4a4455] text-[0.6rem] md:text-[0.6875rem] font-bold uppercase tracking-widest text-center">
                    © 2026 Neural Void Systems. Powered by Inter
                </p>
            </footer>
        </div>
      </main>

      {/* Mobile bottom nav — hidden on desktop */}
      <MobileBottomNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNewTrainingRun={openFilePicker}
      />

      {previewPayload && (
        <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-surface-container rounded-2xl border border-outline-variant/30 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Preview Plan: {previewPayload.fileName}</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Showing first {Math.min(previewPayload.preview?.length || 0, 10)} rows before saving.
            </p>
            <div className="overflow-auto max-h-[350px] rounded-xl border border-outline-variant/20">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-high sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="px-3 py-2 text-left">Topic</th>
                    <th className="px-3 py-2 text-left">Task</th>
                    <th className="px-3 py-2 text-left">Resource</th>
                  </tr>
                </thead>
                <tbody>
                  {(previewPayload.preview || []).map((row, i) => (
                    <tr key={i} className="border-t border-outline-variant/10">
                      <td className="px-3 py-2">{formatDateDDMMYYYY(row.Date)}</td>
                      <td className="px-3 py-2">{row.Topic}</td>
                      <td className="px-3 py-2">{row.Task}</td>
                      <td className="px-3 py-2">{row.Resource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={cancelPreview} className="px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant">Cancel</button>
              <button onClick={confirmAndSavePlan} className="px-4 py-2 rounded-lg bg-primary text-white font-semibold">Confirm & Save Plan</button>
            </div>
          </div>
        </div>
      )}

      {processing && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default App;
