import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function SnedCoordinatorValidationQueue() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

    return (
        <>
            <Head title="Validation Queue — SNED Coordinator Portal · San Mateo Elementary School" />
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
                            <Link href="/sned-coordinator/validation-queue" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100">Validation Queue</Link>
                            <Link href="/sned-coordinator/analytics" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Analytics</Link>
                        </nav>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Validation Queue / SNED Coordinator Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">SC</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">IEP & Accommodation Validation Queue</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Approve, adjust, or request clinical revisions for student accommodation profiles.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200/70 shadow-sm space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">Mia Santos · Grade 1 Section A</h3>
                                    <span className="text-xs text-slate-500">Submitted by Teacher Ana · Today, 9:30 AM</span>
                                </div>
                                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold w-fit">Pending Review</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                    <span className="font-semibold text-slate-700 block">Requested Accommodations</span>
                                    <p className="text-slate-600">Audio prompt enabled, 3 short steps per module, mandatory 2-minute pause between task milestones.</p>
                                </div>
                                <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                    <span className="font-semibold text-slate-700 block">Clinical Rationale</span>
                                    <p className="text-slate-600">Learner exhibits sensory fatigue on multi-step math problems without audio scaffolding.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <button className="px-4 py-2 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm cursor-pointer">Approve & Validate</button>
                                <button className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-all cursor-pointer">Request Revision</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}