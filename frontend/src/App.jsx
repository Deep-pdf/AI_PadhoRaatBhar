import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import HeroMission from './components/HeroMission';
import StatsGrid from './components/StatsGrid';
import DataTable from './components/DataTable';
import CurriculumView from './components/CurriculumView';
import DailyPractice from './components/DailyPractice';

const API_BASE = 'http://localhost:8000';

function App() {
  const [todayTask, setTodayTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'learning_paths'

  const fetchData = async () => {
    try {
      const [todayRes, allRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/today`),
        fetch(`${API_BASE}/all`),
        fetch(`${API_BASE}/stats`)
      ]);
      
      const todayData = await todayRes.json();
      const allData = await allRes.json();
      const statsData = await statsRes.json();
      
      setTodayTask(!todayData.message ? todayData : null);
      setAllTasks(allData);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCompleteTask = async (date) => {
    try {
      const res = await fetch(`${API_BASE}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      });
      
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleUndoTask = async (date) => {
      try {
        const res = await fetch(`${API_BASE}/uncomplete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date })
        });
        if (res.ok) fetchData();
      } catch (err) {
          console.error("Network error:", err);
      }
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden font-body bg-[#0E0E0F]">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10">
        <TopNav currentView={currentView} setCurrentView={setCurrentView} />
        <div className="mt-16 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(109,40,217,0.5)]"></div>
                </div>
            ) : currentView === 'dashboard' ? (
                <>
                    <HeroMission todayTask={todayTask} progress={stats?.progress_percentage} />
                    <StatsGrid stats={stats} setCurrentView={setCurrentView} />
                    {/* Read-only table for Dashboard */}
                    <DataTable tasks={allTasks} onComplete={() => {}} readOnly={true} />
                </>
            ) : currentView === 'learning_paths' ? (
                <CurriculumView tasks={allTasks} onComplete={handleCompleteTask} onUndo={handleUndoTask} stats={stats} />
            ) : currentView === 'practice' ? (
                <DailyPractice />
            ) : null}
            
            {/* Footer */}
            <footer className="w-full mt-auto py-12 flex flex-col items-center gap-4 px-8 border-t border-[#4a4455]/20 bg-[#0A0A0B] rounded-2xl mb-8">
                <div className="flex gap-8">
                    <a className="text-[#4a4455] text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors hover:underline underline-offset-4" href="#">Privacy Policy</a>
                    <a className="text-[#4a4455] text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors hover:underline underline-offset-4" href="#">Terms of Service</a>
                    <a className="text-[#4a4455] text-[0.6875rem] font-bold uppercase tracking-widest hover:text-[#adc6ff] transition-colors hover:underline underline-offset-4" href="#">Changelog</a>
                </div>
                <p className="text-[#4a4455] text-[0.6875rem] font-bold uppercase tracking-widest">
                    © 2026 Neural Void Systems. Powered by Inter
                </p>
            </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
