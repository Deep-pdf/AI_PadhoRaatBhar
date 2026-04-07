import React from 'react';

export default function StatsGrid({ stats, setCurrentView }) {
    if (!stats) return null;

    return (
        <section className="mb-6 md:mb-8">
            {/* Mobile: 2-col grid + full-width CTA */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
                {/* Streak */}
                <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between border border-transparent hover:border-outline-variant/30 transition-all">
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 w-fit mb-3">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tighter text-white mb-0.5">{stats.current_streak}<span className="text-lg ml-1">d</span></p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Streak</p>
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between border border-transparent hover:border-outline-variant/30 transition-all">
                    <div className="p-2 rounded-xl bg-primary-container/20 text-primary w-fit mb-3">
                        <span className="material-symbols-outlined text-xl">calendar_today</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tighter text-white mb-0.5">{stats.completed_days}</p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Completed</p>
                    </div>
                </div>

                {/* Remaining */}
                <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between border border-transparent hover:border-outline-variant/30 transition-all">
                    <div className="p-2 rounded-xl bg-secondary-container/20 text-secondary w-fit mb-3">
                        <span className="material-symbols-outlined text-xl">timer</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tighter text-white mb-0.5">{stats.remaining_days}</p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-on-surface-variant">Remaining</p>
                    </div>
                </div>

                {/* View Plan CTA */}
                <div
                    onClick={() => setCurrentView('learning_paths')}
                    className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-primary/50 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-outline-variant/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-lg">analytics</span>
                    </div>
                    <p className="text-xs font-medium text-white leading-tight">Full Plan</p>
                    <span className="text-primary text-[0.6rem] font-bold uppercase tracking-[0.15em] flex items-center gap-1">
                        View <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                </div>
            </div>

            {/* Desktop: original 4-col layout */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
                <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-container-high transition-all group border border-transparent hover:border-outline-variant/30">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-bold tracking-tighter text-white mb-1">{stats.current_streak} days</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Current Streak</p>
                    </div>
                </div>

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

                <div onClick={() => setCurrentView('learning_paths')} className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                    </div>
                    <p className="text-sm font-medium text-white px-4">Ready for the deep dive?</p>
                    <button className="text-primary text-[0.6875rem] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all pointer-events-none">
                        View Full Plan <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
