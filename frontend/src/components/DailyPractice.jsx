import React from 'react';

export default function DailyPractice() {
    return (
        <div className="w-full">
            {/* Header Section */}
            <header className="mb-10 text-center md:text-left">
                <h1 className="text-[3.5rem] font-black tracking-tight leading-none mb-2 text-on-surface">Daily Practice</h1>
                <p className="text-[1rem] text-on-surface-variant font-medium opacity-80">Sharpen your skills with today's coding task</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
                {/* Today's Topic Card (High Glow) */}
                <section className="lg:col-span-12">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-surface-container border border-outline-variant/20 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                </div>
                                <div>
                                    <span className="text-[0.6875rem] font-bold tracking-[0.2em] text-primary uppercase mb-1 block">TODAY'S TOPIC</span>
                                    <h2 className="text-[1.5rem] font-semibold text-on-surface">Transformer Architecture: Self-Attention</h2>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[0.875rem] font-mono text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">March 14, 2024</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practice Question Card */}
                <section className="lg:col-span-5 h-full">
                    <div className="bg-surface-container border border-outline-variant/20 p-8 rounded-2xl h-full flex flex-col neon-glow-secondary transition-all duration-300">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-secondary">quiz</span>
                            <h3 className="text-lg font-bold text-on-surface uppercase tracking-widest text-[0.75rem]">Problem</h3>
                        </div>
                        <p className="text-on-surface text-[1rem] leading-relaxed mb-8 flex-grow">
                            Implement the <span className="text-secondary font-mono">scaled dot-product attention</span> function using PyTorch. The function should take <span className="text-secondary-fixed">Q, K, V</span> as inputs and return both the attention output and weights.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-md text-[0.6875rem] font-bold tracking-wider uppercase border border-outline-variant/10">PyTorch</span>
                            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-md text-[0.6875rem] font-bold tracking-wider uppercase border border-outline-variant/10">Linear Algebra</span>
                            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-md text-[0.6875rem] font-bold tracking-wider uppercase border border-outline-variant/10">Transformers</span>
                        </div>
                    </div>
                </section>

                {/* Code Block Section */}
                <section className="lg:col-span-7 h-full">
                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden neon-glow-primary transition-all duration-300 h-full flex flex-col">
                        <div className="bg-surface-container p-4 px-6 flex justify-between items-center border-b border-outline-variant/10">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-error/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                                </div>
                                <span className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-widest ml-4">Sample Code</span>
                            </div>
                            <button className="flex items-center gap-2 text-[0.6875rem] font-bold text-primary hover:text-white transition-colors bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 active:scale-95">
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                COPY
                            </button>
                        </div>
                        <div className="p-6 overflow-x-auto flex-grow">
<pre className="font-mono text-[0.875rem] leading-relaxed"><code className="text-on-surface">
<span className="syntax-keyword">import</span> torch
<span className="syntax-keyword">import</span> torch.nn.functional <span className="syntax-keyword">as</span> F

<span className="syntax-keyword">def</span> <span className="syntax-func">scaled_dot_product_attention</span>(q, k, v, mask=None):
    <span className="syntax-comment"># q, k, v shape: (batch, heads, seq_len, d_k)</span>
    d_k = q.size(-<span className="syntax-string">1</span>)
    scores = torch.matmul(q, k.transpose(-<span className="syntax-string">2</span>, -<span className="syntax-string">1</span>)) / torch.sqrt(torch.tensor(d_k))
    
    <span className="syntax-keyword">if</span> mask <span className="syntax-keyword">is not</span> None:
        scores = scores.masked_fill(mask == <span className="syntax-string">0</span>, -<span className="syntax-string">1e9</span>)
        
    weights = F.softmax(scores, dim=-<span className="syntax-string">1</span>)
    output = torch.matmul(weights, v)
    <span className="syntax-keyword">return</span> output, weights
</code></pre>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating Command Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-panel px-6 py-4 rounded-full flex items-center gap-6 shadow-2xl z-50">
                <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-container to-secondary-container text-white rounded-full font-bold text-sm tracking-tight hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(109,40,217,0.3)]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Mark as Practiced
                </button>
                <div className="h-8 w-px bg-outline-variant/30"></div>
                <button className="w-10 h-10 flex items-center justify-center text-[#ccc3d7] hover:text-primary transition-colors hover:bg-surface-container-high rounded-full">
                    <span className="material-symbols-outlined">refresh</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#ccc3d7] hover:text-secondary transition-colors hover:bg-surface-container-high rounded-full">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </div>
        </div>
    );
}
