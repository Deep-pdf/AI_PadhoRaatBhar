import React from 'react';

/**
 * MobileBottomNav — shown only on mobile (< lg breakpoint).
 * Mirrors the bottom tab bar from the Stitch mobile designs:
 * Dashboard | Curriculum | Practice | Settings
 */
export default function MobileBottomNav({ currentView, setCurrentView, onNewTrainingRun }) {
    const tabs = [
        { id: 'dashboard',       icon: 'dashboard',      label: 'Dashboard'  },
        { id: 'learning_paths',  icon: 'menu_book',      label: 'Curriculum' },
        { id: 'practice',        icon: 'fitness_center', label: 'Practice'   },
        { id: 'ai_chat',         icon: 'smart_toy',      label: 'AI Chat'    },
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
            style={{
                background: 'rgba(19, 19, 20, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(149, 141, 161, 0.12)',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
        >
            <div className="flex items-stretch h-16">
                {tabs.map((tab) => {
                    const isActive = currentView === tab.id;
                    return (
                        <button
                            key={tab.id}
                            id={`mobile-nav-${tab.id}`}
                            onClick={() => setCurrentView(tab.id)}
                            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-95 relative"
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Active pill indicator */}
                            {isActive && (
                                <span
                                    className="absolute top-1.5 w-8 h-0.5 rounded-full"
                                    style={{ background: 'linear-gradient(90deg, #d3bbff, #adc6ff)' }}
                                />
                            )}
                            <span
                                className="material-symbols-outlined text-[1.35rem]"
                                style={{
                                    color: isActive ? '#d3bbff' : '#958da1',
                                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                                    transition: 'color 200ms ease-out',
                                }}
                            >
                                {tab.icon}
                            </span>
                            <span
                                className="text-[0.6rem] font-bold tracking-wider uppercase"
                                style={{
                                    color: isActive ? '#d3bbff' : '#958da1',
                                    transition: 'color 200ms ease-out',
                                }}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}

                {/* Upload / New Training Run button */}
                <button
                    id="mobile-nav-upload"
                    onClick={onNewTrainingRun}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all duration-200"
                    aria-label="New Training Run"
                >
                    <span
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #0566d9 100%)' }}
                    >
                        <span className="material-symbols-outlined text-white text-[1.1rem]">add</span>
                    </span>
                    <span className="text-[0.6rem] font-bold tracking-wider uppercase" style={{ color: '#958da1' }}>
                        Upload
                    </span>
                </button>
            </div>
        </nav>
    );
}
