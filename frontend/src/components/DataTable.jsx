import React from 'react';
import { formatDateDDMMYYYY } from '../utils/dateFormat';

function isDone(task) {
    return task?.['Done?'] === true || task?.['Done?'] === 'Yes';
}

export default function DataTable({ tasks, onComplete, onUndo, readOnly = false, highlightedDate = '' }) {
    if (!tasks || tasks.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto mb-12">
            {!readOnly && (
                <div className="flex items-end justify-between pt-6 md:pt-8 mb-4 md:mb-6">
                    <div>
                        <h4 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1 md:mb-2">Curriculum Roadmap</h4>
                        <p className="text-on-surface-variant text-xs md:text-sm">Review full learning plan and task history.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-all">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                        </button>
                        <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-all">
                            <span className="material-symbols-outlined text-sm">download</span>
                        </button>
                    </div>
                </div>
            )}

            {readOnly && (
                <div className="pt-6 md:pt-8 mb-4 md:mb-6">
                    <h4 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1 md:mb-2">Neural Execution Logs</h4>
                </div>
            )}

            {/* ── Mobile: card list (matches Stitch timeline design) ── */}
            <div className="lg:hidden space-y-2">
                {tasks.map((task, idx) => {
                    const isCompleted = isDone(task);
                    const isTodayRow = highlightedDate && String(task.Date) === String(highlightedDate);
                    return (
                        <div
                            key={idx}
                            className={`rounded-2xl p-4 border transition-all ${
                                isTodayRow
                                    ? 'border-primary/40 bg-primary/[0.07]'
                                    : 'border-outline-variant/10 bg-surface-container-low'
                            } ${isCompleted ? 'opacity-60' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Date + day chip */}
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <span className="text-[0.65rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                                            {formatDateDDMMYYYY(task.Date)}
                                        </span>
                                        {task.Day && (
                                            <span className="text-[0.6rem] px-1.5 py-0.5 rounded bg-surface-variant text-on-surface-variant font-bold uppercase tracking-wider">
                                                Day {task.Day}
                                            </span>
                                        )}
                                        {isTodayRow && (
                                            <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                                  style={{ background: 'rgba(109,40,217,0.2)', color: '#d3bbff' }}>
                                                Today
                                            </span>
                                        )}
                                    </div>
                                    {/* Topic */}
                                    <p className="text-sm font-semibold text-on-surface leading-snug mb-1 truncate" title={task.Topic}>
                                        {task.Topic}
                                    </p>
                                    {/* Task */}
                                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2" title={task.Task}>
                                        {task.Task}
                                    </p>
                                </div>

                                {/* Status / actions */}
                                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                                    {isCompleted ? (
                                        readOnly ? (
                                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20">
                                                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                                <span className="text-[0.6rem] font-bold uppercase tracking-wider">Done</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Mark this task as pending again?')) onUndo(task.Date);
                                                }}
                                                className="flex items-center gap-1 px-2 py-1 rounded-full text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                                <span className="text-[0.6rem] font-bold uppercase tracking-wider">Done</span>
                                            </button>
                                        )
                                    ) : (
                                        readOnly ? (
                                            <span className="text-[0.6rem] text-on-surface-variant/50 border border-outline-variant/20 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                                                Pending
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => onComplete(task.Date)}
                                                className="flex items-center gap-1 px-2 py-1 rounded-full text-primary border border-primary/30 bg-primary/[0.07] hover:bg-primary/20 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-xs">radio_button_unchecked</span>
                                                <span className="text-[0.6rem] font-bold uppercase tracking-wider">Mark Done</span>
                                            </button>
                                        )
                                    )}
                                    {task.Resource && task.Resource !== '#' && (
                                        <a
                                            href={task.Resource}
                                            target="_blank" rel="noopener noreferrer"
                                            className="text-secondary text-[0.6rem] font-bold flex items-center gap-0.5 hover:underline"
                                        >
                                            <span className="material-symbols-outlined text-[0.7rem]">open_in_new</span>
                                            Resource
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Desktop: original scrollable table ── */}
            <div className="hidden lg:block bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl ghost-border overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-[#1C1B1C] border-b border-outline-variant/10 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Day</th>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Topic</th>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Task</th>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Resource</th>
                            <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                        {tasks.map((task, idx) => {
                            const isCompleted = isDone(task);
                            const isTodayRow = highlightedDate && String(task.Date) === String(highlightedDate);
                            return (
                                <tr key={idx} className={`hover:bg-surface-bright/30 transition-colors group ${isCompleted ? 'opacity-70' : ''} ${isTodayRow ? 'bg-primary/10' : ''}`}>
                                    <td className="px-6 py-4 text-sm font-medium text-on-surface-variant whitespace-nowrap">
                                        {formatDateDDMMYYYY(task.Date)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-on-surface-variant/60">
                                        {task.Day}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-on-surface max-w-[200px] truncate block" title={task.Topic}>
                                            {task.Topic}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-on-surface-variant max-w-[300px] truncate" title={task.Task}>
                                        {task.Task}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={task.Resource && task.Resource !== '#' ? task.Resource : undefined}
                                            target="_blank" rel="noopener noreferrer"
                                            className="text-xs text-secondary hover:underline flex items-center gap-1"
                                            title={task.Resource}
                                        >
                                            <span className="material-symbols-outlined text-xs">link</span>
                                            {(() => {
                                                if (!task.Resource || task.Resource === '#') return 'Resource';
                                                try {
                                                    return String(task.Resource).startsWith('http') ? new URL(task.Resource).hostname : 'Resource';
                                                } catch { return 'Resource Link'; }
                                            })()}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {isCompleted ? (
                                            readOnly ? (
                                                <div className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]" title="Completed">
                                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to mark this task as pending again?')) {
                                                            onUndo(task.Date);
                                                        }
                                                    }}
                                                    className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#4ade80]/10 border border-[#4ade80]/30 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 text-[#4ade80] transition-all group/btn cursor-pointer"
                                                    title="Click to Undo"
                                                >
                                                    <span className="material-symbols-outlined text-sm group-hover/btn:hidden" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                                    <span className="material-symbols-outlined text-sm hidden group-hover/btn:block text-red-500">undo</span>
                                                </button>
                                            )
                                        ) : (
                                            readOnly ? (
                                                <span className="text-xs text-on-surface-variant/50 border border-outline-variant/20 px-2 py-1 rounded">Pending</span>
                                            ) : (
                                                <button
                                                    onClick={() => onComplete(task.Date)}
                                                    className="inline-flex items-center justify-center w-6 h-6 rounded border border-primary/50 hover:border-primary hover:bg-primary/20 transition-all text-primary"
                                                    title="Mark as Complete"
                                                >
                                                    <span className="material-symbols-outlined text-[10px] opacity-0 group-hover:opacity-100">done</span>
                                                </button>
                                            )
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
