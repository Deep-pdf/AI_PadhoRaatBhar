import React from 'react';
import DataTable from './DataTable';

export default function CurriculumView({ tasks, onComplete, onUndo, stats, highlightedDate }) {
    if (!stats) return null;

    // Calculate current focus (first pending task)
    const currentFocusTask = tasks?.find(t => t['Done?'] !== 'Yes' && t['Done?'] !== true);

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8 md:mt-2">
            {/* Header Section */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-surface-variant text-primary text-[0.6875rem] font-bold tracking-widest px-2 py-1 rounded uppercase">Active Curriculum</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">Curriculum Roadmap</h1>
                        <p className="text-on-surface-variant max-w-2xl">Mastering the depths of AI/ML through structured daily modules.</p>
                    </div>
                </div>
            </div>

            {/* Progress Overview Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                <div className="bg-surface-container rounded-[1.5rem] p-6 ghost-border flex flex-col justify-between">
                    <div>
                        <p className="text-[0.6875rem] font-bold tracking-widest text-on-surface-variant uppercase mb-4">Total Progress</p>
                        <h3 className="text-4xl font-bold tracking-tighter text-white">{stats.progress_percentage}%</h3>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-6 overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: `${stats.progress_percentage}%` }}></div>
                    </div>
                </div>
                
                <div className="bg-surface-container rounded-[1.5rem] p-6 ghost-border">
                    <p className="text-[0.6875rem] font-bold tracking-widest text-on-surface-variant uppercase mb-4">Completed</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-4xl font-bold tracking-tighter text-[#4ade80]">{stats.completed_days}</h3>
                        <span className="text-on-surface-variant text-lg font-medium pb-1">/ {stats.total_days} Tasks</span>
                    </div>
                    <p className="text-xs text-on-surface-variant/60 mt-4">{stats.remaining_days} days remaining</p>
                </div>
                
                <div className="bg-surface-container rounded-[1.5rem] p-6 ghost-border relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
                    </div>
                    <p className="text-[0.6875rem] font-bold tracking-widest text-on-surface-variant uppercase mb-4">Current Focus</p>
                    <h3 className="text-xl font-bold text-white leading-snug line-clamp-2">{currentFocusTask ? currentFocusTask.Topic : 'All Caught Up!'}</h3>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                        <span>{currentFocusTask ? 'Continue Module' : 'Review Plan'}</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                </div>
            </div>

            {/* The Interactive Interactive DataTable */}
            <DataTable tasks={tasks} onComplete={onComplete} onUndo={onUndo} readOnly={false} highlightedDate={highlightedDate} />
            
        </div>
    );
}
