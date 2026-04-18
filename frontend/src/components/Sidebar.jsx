import React from 'react';
import { formatDateDDMMYYYY } from '../utils/dateFormat';
import logoPath from '../assets/LOGO1.png';

export default function Sidebar({
    currentView,
    setCurrentView,
    onNewTrainingRun,
    onDropFile,
    recentPlans = [],
    activePlanId,
    onLoadPlan,
    onDeletePlan,
}) {
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[0];
        if (file && onDropFile) onDropFile(file);
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-[#0E0E0F] flex flex-col py-5 px-4 hidden lg:flex border-r border-[#4a4455]/20">
            <div className="mb-6 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                        <img src={logoPath} alt="PadhoRaatBhar Logo" className="w-full h-full object-contain p-1" />
                    </div>
                    <div>
                        <h2 className="text-[17px] font-black text-[#d3bbff] leading-none tracking-tight">PadhoRaatBhar</h2>
                        <p className="text-[0.62rem] text-on-surface-variant/60 tracking-widest mt-1 uppercase">Beta Access</p>
                    </div>
                </div>
            </div>

            <div className="mb-6" onDragOver={handleDragOver} onDrop={handleDrop}>
                <button
                    onClick={onNewTrainingRun}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Training Run
                </button>
                <p className="text-[0.65rem] text-on-surface-variant/60 mt-2 text-center">
                    Click or drag & drop .xlsx/.csv
                </p>
            </div>

            <div className="mb-5">
                <p className="text-[0.6875rem] font-bold tracking-widest text-on-surface-variant uppercase mb-3 px-1">Recent Plans</p>
                <div className="space-y-2">
                    {recentPlans.length === 0 ? (
                        <div className="rounded-lg border border-outline-variant/20 p-3 text-xs text-on-surface-variant/70">
                            No plans yet. Upload your first training file.
                        </div>
                    ) : (
                        recentPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`rounded-lg border p-3 transition-all ${plan.id === activePlanId
                                    ? 'border-primary/60 bg-primary/10'
                                    : 'border-outline-variant/20 bg-surface-container-low'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs text-white font-medium truncate" title={plan.name}>{plan.name}</p>
                                    <button
                                        type="button"
                                        onClick={() => onDeletePlan && onDeletePlan(plan.id)}
                                        className="text-on-surface-variant/70 hover:text-red-400 transition-colors -mt-0.5"
                                        title="Delete plan"
                                        aria-label={`Delete ${plan.name}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                                <p className="text-[0.65rem] text-on-surface-variant/70 mt-1">
                                    {formatDateDDMMYYYY((plan.uploadDate || '').slice(0, 10))}
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                    <button
                                        onClick={() => onLoadPlan && onLoadPlan(plan.id)}
                                        className="text-[0.65rem] font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                                    >
                                        Load Plan
                                    </button>
                                    {plan.id === activePlanId && (
                                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-primary/80">
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg group ${currentView === 'dashboard' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-medium">Overview</span>
                </button>
                <button onClick={() => setCurrentView('learning_paths')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg ${currentView === 'learning_paths' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">auto_stories</span>
                    <span className="text-sm font-medium">Learning Paths</span>
                </button>
                <button onClick={() => setCurrentView('practice')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg ${currentView === 'practice' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">terminal</span>
                    <span className="text-sm font-medium">Practice</span>
                </button>
                <button onClick={() => setCurrentView('ai_chat')} className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all rounded-lg group ${currentView === 'ai_chat' ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]' : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'}`}>
                    <span className="material-symbols-outlined">smart_toy</span>
                    <span className="text-sm font-medium">JaldiBatao AI</span>
                </button>

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
