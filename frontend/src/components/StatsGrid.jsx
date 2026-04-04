import React from 'react';

export default function StatsGrid({ stats, setCurrentView }) {
    if (!stats) return null;
    
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {/* Streak Card */}
            <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-container-high transition-all group border border-transparent hover:border-outline-variant/30">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-bold tracking-tighter text-white mb-1">{stats.current_streak} days</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Current Streak</p>
                </div>
            </div>

            {/* Total Completed */}
            <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant/30">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 rounded-xl bg-primary-container/20 text-primary">
                        <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-bold tracking-tighter text-white mb-1">{stats.completed_days}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Completed</p>
                </div>
            </div>

            {/* Remaining Days */}
            <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant/30">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 rounded-xl bg-secondary-container/20 text-secondary">
                        <span className="material-symbols-outlined">timer</span>
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-bold tracking-tighter text-white mb-1">{stats.remaining_days}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Remaining Days</p>
                </div>
            </div>

            {/* Full Plan Action */}
            <div onClick={() => setCurrentView('learning_paths')} className="md:col-span-3 lg:col-span-1 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <p className="text-sm font-medium text-white px-4">Ready for the deep dive?</p>
                <button className="text-primary text-[0.6875rem] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all pointer-events-none">
                    View Full Plan <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </section>
    );
}
