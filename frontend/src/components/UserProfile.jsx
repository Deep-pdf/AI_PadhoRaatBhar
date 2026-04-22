import React, { useState } from 'react';

export default function UserProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Profile Hero Section */}
            <section className="relative rounded-[24px] overflow-hidden bg-surface-container-low border border-white/5 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 z-10">
                {/* Decorative background elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
                
                {/* Avatar */}
                <div className="relative shrink-0 group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary-container to-secondary-container neon-glow z-10 relative">
                        <img 
                            alt="Alex Developer" 
                            className="w-full h-full rounded-full object-cover border-4 border-surface-container-low" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNP_N7YvXikhDCC0nlXAVUOkIIWO2IxVFHKCeAo4d0ow1jgfmeMwLmhRolB2OBCTmNDnofFMt99D4pjvnwH4BgeOom3goRlImeai0veU6HqPc72vC8fD6KKolvqI4BpFe4Lem2D9c1ngYrPT076BeYl0Vnmn9QZLVpyKVDbO3gvlwgRbAT9_luFaGu_PmOLcJjKvnp9hmEu6vRHZPKT8qK-DQ9SS9VZMcLcYhe2EeKjEXs60h3o54Wc57_-tJUenAEQu_ADXxPeA_S" 
                        />
                    </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-1">Alex Developer</h2>
                            <p className="text-on-surface-variant text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
                                <span className="material-symbols-outlined text-[18px]">terminal</span>
                                Machine Learning Engineer
                            </p>
                        </div>
                        <button 
                            className="bg-surface-container hover:bg-surface-container-high text-on-surface border border-white/10 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ease-out flex items-center justify-center gap-2 hover:border-primary/30 active:scale-95" 
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit Profile
                        </button>
                    </div>
                    <p className="text-on-surface-variant text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                        Focused on developing scalable deep learning models for natural language processing. Currently diving deep into transformer architectures and reinforcement learning through PadhoRaatBhar's structured paths.
                    </p>
                    
                    {/* Badges/Tags */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 rounded-full bg-surface-container text-primary-fixed text-xs font-semibold tracking-wider uppercase border border-white/5">Python</span>
                        <span className="px-3 py-1 rounded-full bg-surface-container text-secondary-fixed text-xs font-semibold tracking-wider uppercase border border-white/5">PyTorch</span>
                        <span className="px-3 py-1 rounded-full bg-surface-container text-tertiary-fixed text-xs font-semibold tracking-wider uppercase border border-white/5">NLP</span>
                    </div>
                </div>
            </section>

            {/* Grid Layout for Stats & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                {/* Stats Grid (Bento Style) */}
                <div className="lg:col-span-8 grid grid-cols-2 gap-4 md:gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-surface-container rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                            <span className="material-symbols-outlined text-primary">account_tree</span>
                            <h3 className="text-sm font-medium">Total Plans Created</h3>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">12</div>
                        <div className="mt-2 text-xs text-primary-fixed-dim flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +2 this month
                        </div>
                    </div>
                    
                    {/* Stat Card 2 */}
                    <div className="bg-surface-container rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary">calendar_today</span>
                            <h3 className="text-sm font-medium">Total Days Completed</h3>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">148</div>
                        <div className="mt-2 text-xs text-secondary-fixed-dim flex items-center gap-1">
                            Top 15% of users
                        </div>
                    </div>
                    
                    {/* Stat Card 3 */}
                    <div className="bg-surface-container rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors bg-gradient-to-br from-surface-container to-surface-container-high">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3 text-on-surface-variant">
                                <span className="material-symbols-outlined text-error">local_fire_department</span>
                                <h3 className="text-sm font-medium">Current Streak 🔥</h3>
                            </div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">24<span className="text-2xl text-on-surface-variant font-medium ml-1">days</span></div>
                        
                        {/* Mini streak chart representation */}
                        <div className="mt-4 flex gap-1 h-8 items-end">
                            <div className="w-full bg-surface-bright rounded-t-sm h-[30%]"></div>
                            <div className="w-full bg-surface-bright rounded-t-sm h-[50%]"></div>
                            <div className="w-full bg-surface-bright rounded-t-sm h-[40%]"></div>
                            <div className="w-full bg-surface-bright rounded-t-sm h-[70%]"></div>
                            <div className="w-full bg-surface-bright rounded-t-sm h-[85%]"></div>
                            <div className="w-full bg-error rounded-t-sm h-[100%] opacity-80"></div>
                            <div className="w-full bg-error rounded-t-sm h-[100%] shadow-[0_0_8px_rgba(255,180,171,0.5)]"></div>
                        </div>
                    </div>
                    
                    {/* Stat Card 4 (Progress Ring) */}
                    <div className="bg-surface-container rounded-2xl p-6 border border-white/5 flex flex-col justify-center items-center relative">
                        <h3 className="text-sm font-medium text-on-surface-variant absolute top-6 left-6">Overall Progress %</h3>
                        <div className="relative w-32 h-32 mt-4">
                            {/* Track */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" fill="none" r="45" stroke="#353436" strokeWidth="4"></circle>
                                {/* Indicator (72%) */}
                                <circle className="drop-shadow-[0_0_8px_rgba(109,40,217,0.5)]" cx="50" cy="50" fill="none" r="45" stroke="url(#progressGradient)" strokeDasharray="282.7" strokeDashoffset="79.15" strokeLinecap="round" strokeWidth="6"></circle>
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                                        <stop offset="0%" stopColor="#d3bbff"></stop>
                                        <stop offset="100%" stopColor="#0566d9"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-3xl font-bold">72%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Personal Details Sidebar Card */}
                <div className="lg:col-span-4 bg-surface-container-low rounded-2xl border border-white/5 p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        Account Details
                    </h3>
                    <div className="space-y-6 flex-1">
                        <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Full Name</p>
                            <p className="text-sm font-medium bg-surface-container px-4 py-3 rounded-xl border border-white/5">Alex Developer</p>
                        </div>
                        <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Email Address</p>
                            <p className="text-sm font-medium bg-surface-container px-4 py-3 rounded-xl border border-white/5 text-on-surface-variant">alex.dev@neuralvoid.net</p>
                        </div>
                        <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Primary Learning Goal</p>
                            <div className="bg-surface-container px-4 py-3 rounded-xl border border-white/5">
                                <p className="text-sm font-medium text-primary-fixed">Master Generative AI Architecture</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Joined Date</p>
                            <p className="text-sm font-medium text-on-surface-variant px-1">October 14, 2023</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-on-surface-variant">
                        <span>Account Status</span>
                        <span className="flex items-center gap-1 text-secondary-fixed">
                            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_5px_#adc6ff]"></span>
                            Pro Member
                        </span>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <section className="bg-surface-container-low rounded-[24px] border border-white/5 p-6 md:p-8 mt-6">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">analytics</span>
                    Learning Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Weekly Progress Bar Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-on-surface-variant mb-6">Weekly Study Hours</h3>
                        <div className="h-48 flex items-end justify-between gap-2 px-2 border-b border-white/10 pb-2 relative">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-on-surface-variant -ml-6 pb-2">
                                <span>10h</span><span>5h</span><span>0h</span>
                            </div>
                            
                            {/* Bars */}
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[40%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">4h</div>
                            </div>
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[60%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">6h</div>
                            </div>
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[30%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">3h</div>
                            </div>
                            <div className="w-full bg-gradient-to-t from-primary-container to-secondary-container neon-glow rounded-t-md h-[85%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">8.5h</div>
                            </div>
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[50%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">5h</div>
                            </div>
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[70%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">7h</div>
                            </div>
                            <div className="w-full bg-surface-container hover:bg-surface-bright transition-colors rounded-t-md h-[20%] relative group cursor-pointer">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">2h</div>
                            </div>
                        </div>
                        <div className="flex justify-between px-2 mt-2 text-xs text-on-surface-variant font-medium">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span className="text-primary">Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                    
                    {/* Topic Distribution Pie Chart */}
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-sm font-medium text-on-surface-variant w-full mb-6 text-left">Module Completion Status</h3>
                        <div className="flex items-center gap-8 w-full justify-center">
                            <div className="w-40 h-40 rounded-full border-4 border-surface-container-low shadow-[0_0_20px_rgba(0,0,0,0.5)] relative" style={{ background: 'conic-gradient(#6d28d9 0% 45%, #0566d9 45% 75%, #353436 75% 100%)' }}>
                                {/* Inner hole for donut chart look */}
                                <div className="absolute inset-4 bg-surface-container-low rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold">128 <span className="text-xs text-on-surface-variant font-normal block text-center mt-1">Total</span></span>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(109,40,217,0.5)]"></div>
                                    <span className="text-sm text-on-surface">Completed <span className="text-on-surface-variant ml-2">45%</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_8px_rgba(5,102,217,0.5)]"></div>
                                    <span className="text-sm text-on-surface">In Progress <span className="text-on-surface-variant ml-2">30%</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                                    <span className="text-sm text-on-surface">Remaining <span className="text-on-surface-variant ml-2">25%</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setIsEditModalOpen(false)}
                    ></div>
                    
                    {/* Modal Dialog */}
                    <div className="relative w-[95%] max-w-lg bg-surface-container rounded-[24px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(149,141,161,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-surface-container-high/50">
                            <h2 className="text-lg font-semibold text-on-surface">Edit Profile</h2>
                            <button 
                                className="text-on-surface-variant hover:text-white transition-colors" 
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        {/* Form Body */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            {/* Photo Upload Stub */}
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container-lowest border border-white/10 relative group cursor-pointer">
                                    <img 
                                        alt="Current Avatar" 
                                        className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNP_N7YvXikhDCC0nlXAVUOkIIWO2IxVFHKCeAo4d0ow1jgfmeMwLmhRolB2OBCTmNDnofFMt99D4pjvnwH4BgeOom3goRlImeai0veU6HqPc72vC8fD6KKolvqI4BpFe4Lem2D9c1ngYrPT076BeYl0Vnmn9QZLVpyKVDbO3gvlwgRbAT9_luFaGu_PmOLcJjKvnp9hmEu6vRHZPKT8qK-DQ9SS9VZMcLcYhe2EeKjEXs60h3o54Wc57_-tJUenAEQu_ADXxPeA_S" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">photo_camera</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-surface-container-high hover:bg-surface-bright text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/5">Change Avatar</button>
                                    <p className="text-[10px] text-on-surface-variant mt-2 uppercase tracking-wide">JPG, GIF or PNG. Max size 2MB.</p>
                                </div>
                            </div>
                            
                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Display Name</label>
                                    <input 
                                        className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline-variant" 
                                        placeholder="Enter your name" 
                                        type="text" 
                                        defaultValue="Alex Developer" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
                                    <input 
                                        className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline-variant" 
                                        placeholder="you@example.com" 
                                        type="email" 
                                        defaultValue="alex.dev@neuralvoid.net" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Learning Goal</label>
                                    <input 
                                        className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline-variant" 
                                        placeholder="What are you trying to achieve?" 
                                        type="text" 
                                        defaultValue="Master Generative AI Architecture" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Bio</label>
                                    <textarea 
                                        className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline-variant resize-none" 
                                        placeholder="Tell us about yourself..." 
                                        rows="3"
                                        defaultValue="Focused on developing scalable deep learning models for natural language processing. Currently diving deep into transformer architectures and reinforcement learning through PadhoRaatBhar's structured paths."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer Actions */}
                        <div className="px-6 py-4 border-t border-white/5 bg-surface-container-high/30 flex justify-end gap-3">
                            <button 
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-white transition-colors" 
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-container to-secondary-container text-white hover:shadow-[0_0_15px_rgba(109,40,217,0.4)] transition-all active:scale-95" 
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
