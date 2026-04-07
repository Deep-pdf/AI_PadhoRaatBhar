import React from 'react';
import { formatDateDDMMYYYY } from '../utils/dateFormat';

export default function HeroMission({ todayTask, progress }) {
    const isCompleted = todayTask?.['Done?'] === true || todayTask?.['Done?'] === 'Yes';

    if (!todayTask) {
        return (
            <section className="glass-card rounded-[2rem] p-6 md:p-10 flex min-h-[180px] items-center justify-center">
                <p className="text-on-surface-variant">Loading today's mission...</p>
            </section>
        );
    }

    if (todayTask.message) {
        return (
            <section className="glass-card rounded-[2rem] p-6 md:p-10 flex min-h-[180px] flex-col items-center justify-center text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter mb-4">You're all caught up!</h2>
                <p className="text-on-surface-variant">No pending missions for today.</p>
            </section>
        );
    }

    const topicWords = todayTask.Topic ? todayTask.Topic.split(' ') : ['Active', 'Mission'];
    const word1 = topicWords[0];
    const word2 = topicWords.slice(1).join(' ');

    /* ── Circular progress ── */
    const ProgressRing = ({ size = 160, stroke = 6 }) => {
        const r = (size - stroke * 2) / 2;
        const circ = 2 * Math.PI * r;
        const offset = circ - (circ * (progress || 0)) / 100;
        const cx = size / 2;
        return (
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <circle cx={cx} cy={cx} r={r} fill="transparent" stroke="currentColor"
                        className="text-surface-container-highest opacity-30" strokeWidth={stroke} />
                    <circle cx={cx} cy={cx} r={r} fill="transparent" stroke="url(#hero-grad)"
                        strokeDasharray={circ} strokeDashoffset={offset}
                        strokeLinecap="round" strokeWidth={stroke}
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                    <defs>
                        <linearGradient id="hero-grad" x1="0%" x2="100%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#d3bbff" />
                            <stop offset="100%" stopColor="#0566d9" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-black tracking-tighter text-white" style={{ fontSize: size > 140 ? '2.75rem' : '1.75rem' }}>{progress}%</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary">Complete</span>
                </div>
            </div>
        );
    };

    return (
        <section className="mb-6 md:mb-8 transition-all">

            {/* ── Mobile layout (< lg) ── */}
            <div className="lg:hidden">
                {/* Hero card */}
                <div className="glass-card rounded-[1.5rem] p-5 relative overflow-hidden mb-4">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.07] pointer-events-none">
                        <span className="material-symbols-outlined" style={{ fontSize: '7rem' }}>auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 bg-surface-container-high text-primary text-[0.6rem] font-bold uppercase tracking-widest rounded-full">
                                Active Mission
                            </span>
                            <span className="text-on-surface-variant/60 text-xs font-medium">{formatDateDDMMYYYY(todayTask.Date)}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tighter mb-2 leading-tight">
                            {word1}{' '}
                            {word2 && <span className="text-secondary">{word2}</span>}
                        </h2>
                        <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                            <strong className="text-on-surface">Task:</strong> {todayTask.Task}
                        </p>
                    </div>

                    {/* Progress ring + actions row */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            {isCompleted ? (
                                <button className="w-full py-2.5 rounded-xl bg-green-500/20 text-green-400 font-bold border border-green-500/30 text-sm cursor-not-allowed">
                                    ✓ Mission Completed
                                </button>
                            ) : (
                                <button className="w-full py-2.5 rounded-xl hero-gradient text-white font-bold tracking-tight neon-glow active:scale-95 transition-all text-sm">
                                    Start Learning
                                </button>
                            )}
                            <a
                                href={todayTask.Resource !== '#' ? todayTask.Resource : undefined}
                                target="_blank" rel="noopener noreferrer"
                                className="w-full py-2.5 rounded-xl border border-outline-variant/30 text-on-surface text-sm text-center hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                Resource
                            </a>
                        </div>
                        <ProgressRing size={112} stroke={5} />
                    </div>
                </div>

                {/* Velocity label */}
                <div className="flex justify-center">
                    <p className="text-on-surface-variant/60 text-xs uppercase tracking-widest font-bold">Course Velocity</p>
                </div>
            </div>

            {/* ── Desktop layout (≥ lg) — original ── */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
                <div className="col-span-8 glass-card rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-[10rem]">auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-surface-container-high text-primary text-[0.6875rem] font-bold uppercase tracking-widest rounded-full">
                                Active Mission
                            </span>
                            <span className="text-on-surface-variant/60 text-sm font-medium">{formatDateDDMMYYYY(todayTask.Date)}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4 leading-tight">
                            {word1} <br />
                            {word2 && <span className="text-secondary">{word2}</span>}
                        </h2>
                        <p className="text-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed">
                            <strong className="text-on-surface">Task:</strong> {todayTask.Task}
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-wrap gap-4 items-center">
                        {isCompleted ? (
                            <button className="px-8 py-4 rounded-xl bg-green-500/20 text-green-400 font-bold border border-green-500/30 cursor-not-allowed">
                                Mission Completed
                            </button>
                        ) : (
                            <button className="px-8 py-4 rounded-xl hero-gradient text-white font-bold tracking-tight neon-glow hover:scale-[1.02] active:scale-95 transition-all">
                                Start Learning
                            </button>
                        )}
                        <a href={todayTask.Resource !== '#' ? todayTask.Resource : undefined}
                           target="_blank" rel="noopener noreferrer"
                           className="px-8 py-4 rounded-xl border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            Resource
                        </a>
                    </div>
                </div>

                <div className="col-span-4 glass-card rounded-[2rem] p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/70 mb-8">Course Velocity</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        <svg className="w-full h-full -rotate-90">
                            <circle className="text-surface-container-highest opacity-30" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="4" />
                            <circle cx="96" cy="96" fill="transparent" r="88" stroke="url(#gradient)"
                                strokeDasharray="552.92"
                                strokeDashoffset={552.92 - (552.92 * (progress || 0)) / 100}
                                strokeLinecap="round" strokeWidth="6"
                                style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                            <defs>
                                <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#d3bbff" />
                                    <stop offset="100%" stopColor="#0566d9" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black tracking-tighter text-white">{progress}%</span>
                            <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-secondary">Complete</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed px-4">
                        Keep up the momentum! Let's crush today's objectives.
                    </p>
                </div>
            </div>
        </section>
    );
}
