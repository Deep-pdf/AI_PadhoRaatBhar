import React, { useState, useRef, useEffect } from 'react';
import logoPath from '../assets/LOGO1.png';

export default function JaldiBataoAI() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        const newMsg = {
            id: Date.now(),
            role: 'user',
            content: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        
        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'system',
                content: "I'm a beta model right now! Let's pretend I gave you an incredibly insightful answer regarding your prompt. How else can I help?",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full w-full relative bg-[#0E0E0F]">
            {/* Header - Fixed at top, visible only when messages exist */}
            {messages.length > 0 && (
                <header className="px-4 py-3 flex items-center justify-center gap-3 bg-[#0E0E0F]/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#4a4455]/20 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#d3bbff] text-[1.4rem]">smart_toy</span>
                        <h2 className="text-lg font-bold text-white m-0 tracking-tight">JaldiBatao AI</h2>
                    </div>
                </header>
            )}

            {/* Chat Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 md:px-0 scroll-smooth relative">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center pb-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#d3bbff]/30 bg-surface-container flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(109,40,217,0.2)]">
                            <img src={logoPath} alt="AI Logo" className="w-full h-full object-contain p-2 rounded-full" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center px-4">
                            How can I help you today?
                        </h2>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto w-full py-6 space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className="w-full flex">
                                {msg.role === 'user' ? (
                                    <div className="ml-auto bg-[#2A2A2B] text-[#E5E2E3] px-5 py-3.5 rounded-[1.5rem] max-w-[85%] md:max-w-[75%] text-[15px] leading-relaxed">
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                ) : (
                                    <div className="flex gap-4 max-w-full md:max-w-[85%] w-full">
                                        <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full border border-[#d3bbff]/30 bg-surface-container flex items-center justify-center mt-1">
                                            <img src={logoPath} alt="AI" className="w-full h-full object-contain p-1 rounded-full" />
                                        </div>
                                        <div className="flex-1 pt-1 text-[#E5E2E3] text-[15px] leading-relaxed">
                                            {msg.content.includes('```') ? (
                                                <div className="whitespace-pre-wrap">
                                                    {msg.content.split('```').map((block, i) => {
                                                        if (i % 2 === 1) {
                                                            const lines = block.split('\n');
                                                            const lang = lines[0];
                                                            const code = lines.slice(1).join('\n');
                                                            return (
                                                                <div key={i} className="my-4 rounded-xl overflow-hidden border border-[#4a4455]/40 bg-[#0E0E0F]">
                                                                    <div className="bg-[#1C1B1C] px-4 py-2 text-xs font-mono text-[#ccc3d7] flex justify-between items-center">
                                                                        <span>{lang || 'code'}</span>
                                                                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                                                                            <span className="material-symbols-outlined text-[14px]">content_copy</span>
                                                                            <span className="text-[10px] uppercase font-bold tracking-wider">Copy</span>
                                                                        </button>
                                                                    </div>
                                                                    <pre className="p-4 overflow-x-auto text-[13px] font-mono text-[#d3bbff]">
                                                                        {code}
                                                                    </pre>
                                                                </div>
                                                            );
                                                        }
                                                        return <span key={i}>{block}</span>;
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="w-full px-4 md:px-0 pb-6 pt-2 shrink-0 bg-[#0E0E0F]">
                <div className="max-w-3xl mx-auto w-full relative">
                    <form onSubmit={handleSend} className="relative flex items-end bg-[#201F20] border border-[#4a4455]/40 rounded-3xl p-1 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-colors focus-within:border-[#958da1]/50">
                        <button type="button" className="p-3 text-[#ccc3d7] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">add</span>
                        </button>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                            placeholder="Message JaldiBatao AI..."
                            className="w-full max-h-32 min-h-[44px] bg-transparent border-none resize-none py-3.5 px-2 text-[15px] text-white focus:outline-none focus:ring-0 placeholder:text-[#958da1]"
                            rows={1}
                        />
                        <button 
                            type="submit"
                            disabled={!inputText.trim()}
                            className="p-2.5 mx-1 mb-1 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#e5e2e3] transition-colors disabled:opacity-20 disabled:bg-[#4a4455] disabled:text-[#e5e2e3]"
                        >
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-[#958da1] mt-3 tracking-wide">
                        JaldiBatao AI can make mistakes. Consider verifying important logic.
                    </p>
                </div>
            </div>
        </div>
    );
}
