import React, { useState, useRef, useEffect } from 'react';
import logoPath from '../assets/LOGO1.png';

const SYSTEM_PROMPT = "You are an expert tutor. Provide accurate, structured, and easy-to-understand answers. Include examples when helpful.";

export default function JaldiBataoAI() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Load initial history
    useEffect(() => {
        const saved = localStorage.getItem('jaldi_batao_chat_history');
        if (saved) {
            try {
                setMessages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse chat history");
            }
        }
    }, []);

    // Save history on change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('jaldi_batao_chat_history', JSON.stringify(messages));
        } else {
            localStorage.removeItem('jaldi_batao_chat_history');
        }
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            setMessages([]);
            localStorage.removeItem('jaldi_batao_chat_history');
        }
    };

    const fetchGeminiResponse = async (currentMessages, newUserMsgContent) => {
        const apiKey = localStorage.getItem('gemini_api_key');
        if (!apiKey) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'system',
                content: "⚠️ Please add your Gemini API key first in the 'API Key' tab to start chatting.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            return;
        }

        setIsTyping(true);

        try {
            // Build conversation history for API (filter out 'system' messages)
            const apiContents = currentMessages
                .filter(m => m.role === 'user' || m.role === 'model')
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.content }]
                }));

            // Add the new message
            apiContents.push({ role: 'user', parts: [{ text: newUserMsgContent }] });

            const payload = {
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: apiContents,
                generationConfig: {
                    temperature: 0.2
                }
            };

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'API Request Failed';
                if (data.error && data.error.message) {
                    errorMessage = `API Error: ${data.error.message}`;
                }
                throw new Error(errorMessage);
            }

            const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

            setMessages(prev => [...prev, {
                id: Date.now(),
                role: 'model',
                content: botText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                role: 'system',
                content: `Error: ${error.message}. Please check your API key or try again later.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isTyping) return;

        const newMsg = {
            id: Date.now(),
            role: 'user',
            content: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const currentMsgs = [...messages]; // snapshot before adding
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        await fetchGeminiResponse(currentMsgs, newMsg.content);
    };

    return (
        <div className="flex flex-col h-full w-full max-h-full overflow-hidden bg-[#0E0E0F]">
            {/* Header - Fixed at top, visible only when messages exist */}
            {messages.length > 0 && (
                <header className="px-4 py-3 flex items-center justify-between gap-3 bg-[#0E0E0F] z-20 border-b border-[#4a4455]/20 shrink-0">
                    <div className="flex items-center gap-2 max-w-3xl mx-auto w-full relative pl-[40px] md:pl-[60px] justify-center">
                        <span className="material-symbols-outlined text-[#d3bbff] text-[1.4rem]">smart_toy</span>
                        <h2 className="text-lg font-bold text-white m-0 tracking-tight">JaldiBatao AI</h2>
                        <button
                            onClick={clearChat}
                            className="absolute right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-red-400 hover:border-red-400/30 transition-colors text-xs font-semibold"
                            title="Clear Chat History"
                        >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    </div>
                </header>
            )}

            {/* Chat Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 md:px-0 scroll-smooth relative min-h-0">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center pb-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#d3bbff]/30 bg-surface-container flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(109,40,217,0.2)]">
                            <img src={logoPath} alt="AI Logo" className="w-full h-full object-contain p-2 rounded-full" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center px-4">
                            How can I help you today?
                        </h2>
                        <p className="text-on-surface-variant text-sm mt-4 text-center max-w-sm px-4">
                            Make sure you have added your Gemini API Key in the API Key tab before starting.
                        </p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full py-6 space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className="w-full flex">
                                {msg.role === 'user' ? (
                                    <div className="ml-auto bg-[#2A2A2B] text-[#E5E2E3] px-5 py-3.5 rounded-[1.5rem] max-w-[85%] md:max-w-[75%] text-[15px] leading-relaxed">
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                ) : msg.role === 'system' ? (
                                    <div className="mx-auto w-full max-w-[90%] md:max-w-[80%] rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-300 text-sm text-center flex items-center justify-center gap-2">
                                        {msg.content}
                                    </div>
                                ) : (
                                    <div className="flex gap-4 max-w-full md:max-w-[85%] w-full">
                                        <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full border border-[#d3bbff]/30 bg-surface-container flex items-center justify-center mt-1">
                                            <img src={logoPath} alt="AI" className="w-full h-full object-contain p-1 rounded-full" />
                                        </div>
                                        <div className="flex-1 pt-1 text-[#E5E2E3] text-[15px] leading-relaxed markdown-content">
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
                                                                        <button
                                                                            onClick={() => navigator.clipboard.writeText(code)}
                                                                            className="flex items-center gap-1 hover:text-white transition-colors"
                                                                        >
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

                        {/* Loading Indicator */}
                        {isTyping && (
                            <div className="w-full flex">
                                <div className="flex gap-4 max-w-full md:max-w-[85%] w-full animate-pulse">
                                    <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full border border-[#d3bbff]/30 bg-surface-container flex items-center justify-center mt-1">
                                        <img src={logoPath} alt="AI" className="w-full h-full object-contain p-1 rounded-full opacity-50" />
                                    </div>
                                    <div className="flex-1 pt-3 flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#d3bbff]/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-[#d3bbff]/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-[#d3bbff]/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="w-full px-4 md:px-0 pb-6 pt-2 shrink-0 bg-[#0E0E0F]">
                <div className="max-w-3xl mx-auto w-full relative">
                    <form onSubmit={handleSend} className="relative flex items-end bg-[#201F20] border border-[#4a4455]/40 rounded-3xl p-1 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-colors focus-within:border-[#958da1]/50">
                        <button type="button" className="p-3 text-[#ccc3d7] hover:text-white transition-colors" disabled={isTyping}>
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
                            placeholder={isTyping ? "JaldiBatao AI is thinking..." : "Message JaldiBatao AI..."}
                            disabled={isTyping}
                            className="w-full max-h-32 min-h-[44px] bg-transparent border-none resize-none py-3.5 px-2 text-[15px] text-white focus:outline-none focus:ring-0 placeholder:text-[#958da1] disabled:opacity-50"
                            rows={1}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            className="p-2.5 mx-1 mb-1 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#e5e2e3] transition-colors disabled:opacity-20 disabled:bg-[#4a4455] disabled:text-[#e5e2e3]"
                        >
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-[#958da1] mt-3 tracking-wide flex justify-center items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] opacity-70">lock</span>
                        API keys are stored securely in your browser and never sent to our servers.
                    </p>
                </div>
            </div>
        </div>
    );
}
