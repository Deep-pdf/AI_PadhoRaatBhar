import React from 'react';

export default function Sidebar({ currentView, setCurrentView }) {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-[#0E0E0F] flex flex-col py-6 px-4 hidden lg:flex pt-20 border-r border-[#4a4455]/20">
            <div className="mb-8 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-primary shadow-lg">
                        <span className="material-symbols-outlined">memory</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-[#d3bbff] leading-none">AI Tracker</h2>
                        <p className="text-[0.6875rem] text-on-surface-variant/60 tracking-widest mt-1">v2.4.0-ALPHA</p>
                    </div>
                </div>
            </div>
            
            <button className="mb-8 w-full py-3 px-4 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all active:scale-95">
                <span className="material-symbols-outlined text-sm">add</span>
                New Training Run
            </button>
            
            <nav className="flex-1 space-y-1">
                <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg group ${currentView === 'dashboard' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-medium">Overview</span>
                </button>
                <button onClick={() => setCurrentView('learning_paths')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg ${currentView === 'learning_paths' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">auto_stories</span>
                    <span className="text-sm font-medium">Learning Paths</span>
                </button>
                <a className="flex items-center gap-3 px-4 py-2.5 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg group" href="#">
                    <span className="material-symbols-outlined">memory</span>
                    <span className="text-sm font-medium">Neural Logs</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-2.5 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg group" href="#">
                    <span className="material-symbols-outlined">database</span>
                    <span className="text-sm font-medium">Datasets</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-2.5 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg group" href="#">
                    <span className="material-symbols-outlined">key</span>
                    <span className="text-sm font-medium">API Keys</span>
                </a>
            </nav>
            
            <div className="mt-auto space-y-1 border-t border-outline-variant/20 pt-4">
                <a className="flex items-center gap-3 px-4 py-2 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg" href="#">
                    <span className="material-symbols-outlined">description</span>
                    <span className="text-sm">Documentation</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-2 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg" href="#">
                    <span className="material-symbols-outlined">help</span>
                    <span className="text-sm">Support</span>
                </a>
            </div>
        </aside>
    );
}
