import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function SnedCoordinatorAnalytics() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

    return (
        <>
            <Head title="Analytics — SNED Coordinator Portal · San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0 ${sidebarOpen ? 'w-64 shadow-sm md:shadow-none' : 'w-20'}`}>
                    <div className="space-y-6 overflow-y-auto overflow-x-hidden flex-1 pr-1">
                        <div className={`flex items-center pb-4 border-b border-slate-100 ${sidebarOpen ? 'justify-between' : 'flex-col gap-3'}`}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 border border-slate-200/70 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">SM</div>
                                {sidebarOpen && <span className="font-bold text-slate-900 block text-xs leading-tight">LearnPath</span>}
                            </div>
                        </div>
                        <nav className="space-y-1">
                            <Link href="/sned-coordinator/overview" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Overview</Link>
                            <Link href="/sned-coordinator/learners" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Learners</Link>
                            <Link href="/sned-coordinator/validation-queue" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Validation Queue</Link>
                            <Link href="/sned-coordinator/analytics" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100">Analytics</Link>
                        </nav>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Analytics / SNED Coordinator Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">SC</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Inclusion Efficacy Analytics</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">DepEd compliance tracking, accommodation success rates, and milestone progression.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Overall Cohort Progress</span>
                            <div className="text-2xl font-bold text-slate-900">88.2%</div>
                        </div>
                        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-emerald-900">Audio Prompt Utilization</span>
                            <div className="text-2xl font-bold text-emerald-950">92%</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">IEP Validation Turnaround</span>
                            <div className="text-2xl font-bold text-slate-900">1.2 Days</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900">Accommodations Efficacy Breakdown</h2>
                        <div className="space-y-4 text-xs">
                            <div className="space-y-1.5">
                                <div className="flex justify-between font-semibold text-slate-800">
                                    <span>Audio Scaffolding (Math & Reading)</span>
                                    <span>95% Success Rate</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#4B8B6B] h-full rounded-full w-[95%]"></div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between font-semibold text-slate-800">
                                    <span>Pacing Pauses (Mild ASD Support)</span>
                                    <span>89% Success Rate</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full w-[89%]"></div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between font-semibold text-slate-800">
                                    <span>High Contrast Visual Layouts</span>
                                    <span>91% Success Rate</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-sky-500 h-full rounded-full w-[91%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}