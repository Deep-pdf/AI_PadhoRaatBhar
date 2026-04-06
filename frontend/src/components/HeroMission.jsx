import React from 'react';
import { formatDateDDMMYYYY } from '../utils/dateFormat';

export default function HeroMission({ todayTask, progress }) {
    const isCompleted = todayTask?.['Done?'] === true || todayTask?.['Done?'] === 'Yes';
    if (!todayTask) {
        return (
            <section className="glass-card rounded-[2rem] p-10 flex min-h-[200px] items-center justify-center">
                <p className="text-on-surface-variant">Loading today's mission...</p>
            </section>
        );
    }

    if (todayTask.message) {
        return (
            <section className="glass-card rounded-[2rem] p-10 flex min-h-[200px] flex-col items-center justify-center text-center">
                 <h2 className="text-3xl font-extrabold text-white tracking-tighter mb-4">You're all caught up!</h2>
                 <p className="text-on-surface-variant">No pending missions for today.</p>
            </section>
        );
    }

    // Split Topic into two words if possible for the big display
    const topicWords = todayTask.Topic ? todayTask.Topic.split(' ') : ['Active', 'Mission'];
    const word1 = topicWords[0];
    const word2 = topicWords.slice(1).join(' ');

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 transition-all">
            <div className="lg:col-span-8 glass-card rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
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
                        {word1} <br/> 
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
            
            {/* Circular Progress Section */}
            <div className="lg:col-span-4 glass-card rounded-[2rem] p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/70 mb-8">Course Velocity</h3>
                
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <svg className="w-full h-full -rotate-90">
                        <circle className="text-surface-container-highest opacity-30" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="4"></circle>
                        <circle cx="96" cy="96" fill="transparent" r="88" stroke="url(#gradient)" 
                            strokeDasharray="552.92" 
                            strokeDashoffset={552.92 - (552.92 * (progress || 0)) / 100} 
                            strokeLinecap="round" strokeWidth="6"
                            style={{ transition: 'stroke-dashoffset 1s ease-out' }}>
                        </circle>
                        <defs>
                            <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                                <stop offset="0%" stopColor="#d3bbff"></stop>
                                <stop offset="100%" stopColor="#0566d9"></stop>
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
        </section>
    );
}
