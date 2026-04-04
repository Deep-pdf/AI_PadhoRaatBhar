import React, { useCallback, useEffect, useState } from 'react';

function formatDisplayDate(isoDate) {
    if (!isoDate || isoDate.length < 10) return isoDate || '';
    const d = new Date(`${isoDate.slice(0, 10)}T12:00:00`);
    return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function DailyPractice({ apiBase, onMarkPracticed }) {
    const [practice, setPractice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const loadPractice = useCallback(async () => {
        setLoading(true);
        setError(null);
        setCopied(false);
        try {
            const res = await fetch(`${apiBase}/practice`);
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                const msg = body.detail || res.statusText || 'Could not load practice';
                throw new Error(typeof msg === 'string' ? msg : 'Could not load practice');
            }
            const data = await res.json();
            setPractice(data);
        } catch (err) {
            setPractice(null);
            setError(err.message || 'Network error');
        } finally {
            setLoading(false);
        }
    }, [apiBase]);

    useEffect(() => {
        loadPractice();
    }, [loadPractice]);

    const handleCopy = async () => {
        if (!practice?.code) return;
        try {
            await navigator.clipboard.writeText(practice.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const handleShare = async () => {
        if (!practice?.code) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Practice: ${practice.topic}`,
                    text: practice.code,
                });
            } catch {
                /* dismissed or failed */
            }
        } else {
            handleCopy();
        }
    };

    const handleMarkPracticed = () => {
        if (practice?.date && onMarkPracticed) {
            onMarkPracticed(practice.date);
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(109,40,217,0.5)]" />
            </div>
        );
    }

    if (error || !practice) {
        return (
            <div className="w-full max-w-xl mx-auto text-center py-16">
                <p className="text-on-surface-variant mb-6">{error || 'No practice available.'}</p>
                <button
                    type="button"
                    onClick={loadPractice}
                    className="px-6 py-3 bg-primary/20 text-primary rounded-full font-semibold border border-primary/30 hover:bg-primary/30 transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    const tags = [practice.topic].filter(Boolean);

    return (
        <div className="w-full">
            <header className="mb-10 text-center md:text-left">
                <h1 className="text-[3.5rem] font-black tracking-tight leading-none mb-2 text-on-surface">
                    Daily Practice
                </h1>
                <p className="text-[1rem] text-on-surface-variant font-medium opacity-80">
                    Sharpen your skills with today&apos;s coding task
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
                <section className="lg:col-span-12">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-surface-container border border-outline-variant/20 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                    <span
                                        className="material-symbols-outlined text-3xl"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        auto_awesome
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[0.6875rem] font-bold tracking-[0.2em] text-primary uppercase mb-1 block">
                                        TODAY&apos;S TOPIC
                                    </span>
                                    <h2 className="text-[1.5rem] font-semibold text-on-surface">{practice.topic}</h2>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[0.875rem] font-mono text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">
                                    {formatDisplayDate(practice.date)}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-5 h-full">
                    <div className="bg-surface-container border border-outline-variant/20 p-8 rounded-2xl h-full flex flex-col neon-glow-secondary transition-all duration-300">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-secondary">quiz</span>
                            <h3 className="text-lg font-bold text-on-surface uppercase tracking-widest text-[0.75rem]">
                                Problem
                            </h3>
                        </div>
                        <ul className="text-on-surface text-[1rem] leading-relaxed mb-8 flex-grow list-disc pl-5 space-y-3">
                            {practice.questions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-md text-[0.6875rem] font-bold tracking-wider uppercase border border-outline-variant/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-7 h-full">
                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden neon-glow-primary transition-all duration-300 h-full flex flex-col">
                        <div className="bg-surface-container p-4 px-6 flex justify-between items-center border-b border-outline-variant/10">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-error/40" />
                                    <div className="w-3 h-3 rounded-full bg-secondary/40" />
                                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                                </div>
                                <span className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-widest ml-4">
                                    Sample Code
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="flex items-center gap-2 text-[0.6875rem] font-bold text-primary hover:text-white transition-colors bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                        <div className="p-6 overflow-x-auto flex-grow">
                            <pre className="font-mono text-[0.875rem] leading-relaxed text-on-surface whitespace-pre-wrap break-words">
                                <code>{practice.code}</code>
                            </pre>
                        </div>
                    </div>
                </section>
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-panel px-6 py-4 rounded-full flex items-center gap-6 shadow-2xl z-50">
                <button
                    type="button"
                    onClick={handleMarkPracticed}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-container to-secondary-container text-white rounded-full font-bold text-sm tracking-tight hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(109,40,217,0.3)]"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                    </span>
                    Mark as Practiced
                </button>
                <div className="h-8 w-px bg-outline-variant/30" />
                <button
                    type="button"
                    onClick={loadPractice}
                    className="w-10 h-10 flex items-center justify-center text-[#ccc3d7] hover:text-primary transition-colors hover:bg-surface-container-high rounded-full"
                    aria-label="Refresh practice"
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
                <button
                    type="button"
                    onClick={handleShare}
                    className="w-10 h-10 flex items-center justify-center text-[#ccc3d7] hover:text-secondary transition-colors hover:bg-surface-container-high rounded-full"
                    aria-label="Share sample code"
                >
                    <span className="material-symbols-outlined">share</span>
                </button>
            </div>
        </div>
    );
}
