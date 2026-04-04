import React from 'react';

export default function TopNav({ currentView, setCurrentView }) {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#131314] flex justify-between items-center px-8 h-16 max-w-full ghost-border">
            <div className="flex items-center gap-8">
                <span className="text-xl font-bold tracking-tighter text-[#d3bbff] lg:hidden">AI Tracker</span>
                <div className="relative w-64 hidden lg:block ml-12 lg:ml-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                    <input className="w-full bg-[#1C1B1C] border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Search architecture..." type="text"/>
                </div>
                
                <nav className="hidden lg:flex gap-6 items-center h-full ml-4">
                    <button onClick={() => setCurrentView('dashboard')} className={currentView === 'dashboard' ? "text-[#d3bbff] border-b-2 border-[#6d28d9] pb-1 font-medium px-2 py-1" : "text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded"}>Dashboard</button>
                    <button onClick={() => setCurrentView('learning_paths')} className={currentView === 'learning_paths' ? "text-[#d3bbff] border-b-2 border-[#6d28d9] pb-1 font-medium px-2 py-1" : "text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded"}>Curriculum</button>
                    <button onClick={() => setCurrentView('practice')} className={currentView === 'practice' ? "text-[#d3bbff] border-b-2 border-[#6d28d9] pb-1 font-medium px-2 py-1" : "text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded"}>Practice</button>
                    <a className="text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded" href="#">Playground</a>
                    <a className="text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] transition-all duration-200 ease-out py-1 px-2 rounded" href="#">Settings</a>
                </nav>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="p-2 text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] rounded-full transition-colors hidden md:block">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="p-2 text-[#ccc3d7] hover:text-[#d3bbff] hover:bg-[#201F20] rounded-full transition-colors hidden md:block">
                    <span className="material-symbols-outlined">terminal</span>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                    <img alt="User Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvhx_lJcF37wDccZKT3v62yJCBreX2p2fhaFsVeSRKeatOOkDBAJCwXwyhWXzW3GU4QqvZJj282ZKlWtY2x0Vj7FLTDqaeTAbGePykxlKuJ0gHXMktlvVeG3SyyeL9UmJKl-VP9J0Q6hKRkU5ND1I5Z4a7IIpclG_cd71eDsK55ejRXyzXjwdH2XK2wO6tXdYv3Fy3aKhFwU2sx0jRKOWcaTRvVfubi2dEh9hATlflYseJ3lT9KsD7DqYr3iN3_xIRp5hkH6VU-Cd-" />
                </div>
            </div>
        </header>
    );
}
