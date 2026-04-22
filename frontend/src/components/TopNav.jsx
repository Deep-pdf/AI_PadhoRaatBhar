import React, { useState } from 'react';
import logoPath from '../assets/LOGO1.png';

/**
 * TopNav — desktop: full nav bar with search + tabs.
 * Mobile: logo, hamburger → slide-in drawer (plans, upload, nav links).
 */
export default function TopNav({
    currentView,
    setCurrentView,
    onNewTrainingRun,
    recentPlans = [],
    activePlanId,
    onLoadPlan,
    onDeletePlan,
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navTo = (view) => {
        setCurrentView(view);
        setDrawerOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#131314] flex justify-between items-center px-4 md:px-8 h-16 ghost-border">
                {/* Left: brand (mobile) + search (desktop) */}
                <div className="flex items-center gap-4">
                    {/* Brand — always visible on mobile */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={logoPath} alt="PadhoRaatBhar" className="w-[120%] h-[120%] object-contain" />
                        </div>
                        <span className="text-[24px] font-bebas tracking-tight text-[#d3bbff] leading-none">PadhoRaatBhar</span>
                    </div>

                    {/* Search — desktop only */}
                    <div className="relative w-64 hidden lg:block ml-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                        <input
                            className="w-full bg-[#1C1B1C] border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Search architecture..."
                            type="text"
                        />
                    </div>

                    {/* Desktop nav tabs */}
                    <nav className="hidden lg:flex gap-6 items-center h-full ml-4">
                        {[
                            { id: 'dashboard',      label: 'Dashboard'  },
                            { id: 'learning_paths', label: 'Curriculum' },
                            { id: 'practice',       label: 'Practice'   },
                            { id: 'ai_chat',        label: 'JaldiBatao AI' },
                            { id: 'api_key',        label: 'API Key'    },
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setCurrentView(id)}
                                className={
                                    currentView === id
                                        ? 'text-[#d3bbff] border-b-2 border-[#6d28d9] pb-1 font-medium px-2 py-1'
                                        : 'text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded'
                                }
                            >
                                {label}
                            </button>
                        ))}
                        <a className="text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded" href="#">Settings</a>
                    </nav>
                </div>

                {/* Right: icons + hamburger */}
                <div className="flex items-center gap-2 md:gap-3">
                    <button className="p-2 text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] rounded-full transition-colors hidden md:flex">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="p-2 text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] rounded-full transition-colors hidden md:flex">
                        <span className="material-symbols-outlined">terminal</span>
                    </button>
                    <button 
                        onClick={() => setCurrentView('profile')}
                        className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hidden sm:block hover:shadow-[0_0_15px_rgba(109,40,217,0.3)] hover:border-primary/50 transition-all cursor-pointer"
                    >
                        <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvhx_lJcF37wDccZKT3v62yJCBreX2p2fhaFsVeSRKeatOOkDBAJCwXwyhWXzW3GU4QqvZJj282ZKlWtY2x0Vj7FLTDqaeTAbGePykxlKuJ0gHXMktlvVeG3SyyeL9UmJKl-VP9J0Q6hKRkU5ND1I5Z4a7IIpclG_cd71eDsK55ejRXyzXjwdH2XK2wO6tXdYv3Fy3aKhFwU2sx0jRKOWcaTRvVfubi2dEh9hATlflYseJ3lT9KsD7DqYr3iN3_xIRp5hkH6VU-Cd-" />
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        id="mobile-menu-toggle"
                        className="lg:hidden p-2 rounded-lg text-[#ccc3d7] hover:bg-[#201F20] transition-colors"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* ── Mobile Drawer ── */}
            {/* Backdrop */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Slide-in panel */}
            <aside
                className="fixed top-0 right-0 bottom-0 z-[70] lg:hidden w-72 flex flex-col py-6 px-5 overflow-y-auto transition-transform duration-300"
                style={{
                    background: 'rgba(13,13,14,0.97)',
                    backdropFilter: 'blur(24px)',
                    borderLeft: '1px solid rgba(149,141,161,0.12)',
                    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
                }}
                aria-hidden={!drawerOpen}
            >
                {/* Drawer header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            <img src={logoPath} alt="PadhoRaatBhar" className="w-[120%] h-[120%] object-contain" />
                        </div>
                        <span className="text-[24px] font-bebas tracking-tight text-[#d3bbff] leading-none">PadhoRaatBhar</span>
                    </div>
                    <button
                        id="mobile-menu-close"
                        onClick={() => setDrawerOpen(false)}
                        className="p-2 rounded-lg text-[#ccc3d7] hover:bg-[#201F20] transition-colors"
                        aria-label="Close menu"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Upload button */}
                <button
                    onClick={() => { onNewTrainingRun?.(); setDrawerOpen(false); }}
                    className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all mb-1"
                    style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #0566d9 100%)' }}
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Training Run
                </button>
                <p className="text-[0.65rem] text-on-surface-variant/60 text-center mb-5">Click or drag &amp; drop .xlsx/.csv</p>

                {/* Recent Plans */}
                {recentPlans.length > 0 && (
                    <div className="mb-5">
                        <p className="text-[0.6875rem] font-bold tracking-widest text-on-surface-variant uppercase mb-3 px-1">Recent Plans</p>
                        <div className="space-y-2">
                            {recentPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`rounded-lg border p-3 transition-all ${
                                        plan.id === activePlanId
                                            ? 'border-primary/60 bg-primary/10'
                                            : 'border-outline-variant/20 bg-surface-container-low'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-xs text-white font-medium truncate">{plan.name}</p>
                                        <button
                                            onClick={() => { onDeletePlan?.(plan.id); }}
                                            className="text-on-surface-variant/70 hover:text-red-400 transition-colors"
                                            aria-label={`Delete ${plan.name}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <button
                                            onClick={() => { onLoadPlan?.(plan.id); setDrawerOpen(false); }}
                                            className="text-[0.65rem] font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                                        >
                                            Load Plan
                                        </button>
                                        {plan.id === activePlanId && (
                                            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-primary/80">Active</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Nav items */}
                <nav className="flex-1 space-y-1">
                    {[
                        { id: 'dashboard',      icon: 'dashboard',      label: 'Overview'   },
                        { id: 'learning_paths', icon: 'auto_stories',   label: 'Learning Paths' },
                        { id: 'practice',       icon: 'terminal',       label: 'Practice'   },
                        { id: 'ai_chat',        icon: 'smart_toy',      label: 'JaldiBatao AI' },
                        { id: 'api_key',        icon: 'key',            label: 'API Key'    },
                        { id: 'profile',        icon: 'person',         label: 'Profile'    },
                    ].map(({ id, icon, label }) => (
                        <button
                            key={id}
                            onClick={() => navTo(id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left ${
                                currentView === id
                                    ? 'bg-[#201F20] text-[#d3bbff] shadow-[0_0_15px_rgba(109,40,217,0.3)]'
                                    : 'text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100'
                            }`}
                        >
                            <span className="material-symbols-outlined">{icon}</span>
                            <span className="text-sm font-medium">{label}</span>
                        </button>
                    ))}
                </nav>

                {/* Bottom links */}
                <div className="mt-auto pt-4 border-t border-outline-variant/20 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg">
                        <span className="material-symbols-outlined">description</span>
                        <span className="text-sm">Documentation</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-[#ccc3d7] opacity-70 hover:bg-[#2A2A2B] hover:opacity-100 transition-all rounded-lg">
                        <span className="material-symbols-outlined">help</span>
                        <span className="text-sm">Support</span>
                    </a>
                </div>
            </aside>
        </>
    );
}
