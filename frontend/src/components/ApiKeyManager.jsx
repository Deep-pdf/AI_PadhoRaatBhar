import React, { useState, useEffect } from 'react';

export default function ApiKeyManager() {
    const [apiKey, setApiKey] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('gemini_api_key', apiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleRemove = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
    };

    return (
        <div className="max-w-2xl mx-auto w-full pt-8 px-4 h-[calc(100vh-64px)] overflow-hidden">
            <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-left border border-[#4a4455]/20 bg-[#131314] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/20 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(109,40,217,0.3)] shrink-0">
                         <span className="material-symbols-outlined text-primary text-2xl">key</span>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">API Key Management</h2>
                        <p className="text-sm md:text-base text-on-surface-variant mt-1">Store your Gemini API Key locally in your browser to use JaldiBatao AI.</p>
                    </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mb-8 relative z-10 shadow-inner">
                    <div className="flex gap-4">
                        <span className="material-symbols-outlined text-amber-400 mt-1" style={{ fontSize: '28px'}}>security</span>
                        <div className="text-sm md:text-[15px] text-amber-200/90 leading-relaxed">
                            <strong className="text-amber-100 block mb-1.5 text-base">Privacy First</strong>
                            Your API key is securely stored in your browser's local storage. It is <strong className="text-white">never</strong> sent to our servers. It's only sent directly to Google's Gemini API when you initiate a chat with JaldiBatao AI.
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6 relative z-10">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-semibold tracking-wide text-[#ccc3d7] mb-2 ml-1">
                            Google Gemini API Key
                        </label>
                        <input
                            type="password"
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy...................................."
                            className="w-full bg-[#201F20]/80 border border-[#4a4455]/40 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-inner"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!apiKey.trim()}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-[#8b5cf6] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            {saved ? 'Saved Successfully!' : 'Save API Key'}
                        </button>
                        
                        {localStorage.getItem('gemini_api_key') && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="py-3.5 px-6 rounded-xl border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition-colors flex items-center gap-2 group active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">delete</span>
                                Remove
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-10 pt-6 border-t border-[#4a4455]/20 text-[13px] text-on-surface-variant/70 text-center relative z-10 font-medium">
                    Need an API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors underline underline-offset-4 decoration-primary/50">Get one from Google AI Studio</a>
                </div>
            </div>
        </div>
    );
}
