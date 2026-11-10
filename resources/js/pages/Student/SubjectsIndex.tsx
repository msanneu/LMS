import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function SubjectsIndex() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });

    return (
        <>
            <Head title="Subjects — Student Portal · San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                
                {sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/15 z-40 md:hidden backdrop-blur-3xs transition-opacity" />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0
                    ${sidebarOpen ? 'w-64 shadow-sm md:shadow-none translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
                `}>
                    <div className="space-y-6 overflow-y-auto overflow-x-hidden flex-1 pr-1">
                        <div className={`flex items-center pb-4 border-b border-slate-100 ${sidebarOpen ? 'justify-between' : 'flex-col gap-3'}`}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 border border-slate-200/70 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">SM</div>
                                {sidebarOpen && (
                                    <div className="truncate">
                                        <span className="font-bold text-slate-900 block text-xs leading-tight">LearnPath</span>
                                        <span className="text-[11px] text-slate-500 font-medium">San Mateo Elementary</span>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shrink-0 border border-transparent hover:border-slate-200/70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>
                        <div>
                            {sidebarOpen && <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Student Portal</div>}
                            <nav className="space-y-1">
                                <Link href="/student/dashboard" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                    {sidebarOpen && <span>My Learning Home</span>}
                                </Link>

                                <Link href="/student/subjects" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <span className="text-sm shrink-0">📚</span>
                                    {sidebarOpen && <span>Subjects</span>}
                                </Link>

                                <Link href="/student/activity" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    {sidebarOpen && <span>Fun Activities</span>}
                                </Link>

                                <Link href="/student/rewards" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                                    {sidebarOpen && <span>My Star Badges</span>}
                                </Link>
                            </nav>
                        </div>
                    </div>
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 shrink-0 bg-white">
                        <Link href="/login" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                            {sidebarOpen && <span className="truncate">Sign out</span>}
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className={`flex-1 pt-4 pb-6 px-4 sm:px-8 lg:px-10 max-w-4xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64 md:mr-auto' : 'md:ml-auto md:mr-auto'}`}>
                    
                    {/* Top Bar: Mobile only */}
                    <div className="flex items-center justify-between bg-white p-3 sm:px-5 rounded-xl border border-slate-200/70 shadow-sm w-full md:hidden">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-50 border border-slate-200 cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>
                            <span className="text-xs font-semibold text-slate-500">Subjects / Student Portal</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                            MS
                        </div>
                    </div>

                    {/* Desktop Top Bar info */}
                    <div className="hidden md:flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Subjects Hub / Student Portal</span>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                            MS
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Explore Subjects 📚</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Pick a subject world to view your learning levels.</p>
                    </div>

                    {/* Subject Cards Hub Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Link 
                            href="/student/subject/math"
                            className="p-6 bg-sky-50/80 hover:bg-sky-100 border border-sky-200/80 rounded-3xl transition-all cursor-pointer space-y-2.5 shadow-2xs group block"
                        >
                            <span className="text-3xl block">🔢</span>
                            <span className="font-bold text-sm text-sky-950 block group-hover:underline">Math World</span>
                            <span className="text-xs text-sky-800/80 block leading-relaxed">Numbers, counting, and fun arithmetic levels.</span>
                        </Link>

                        <Link 
                            href="/student/subject/reading"
                            className="p-6 bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 rounded-3xl transition-all cursor-pointer space-y-2.5 shadow-2xs group block"
                        >
                            <span className="text-3xl block">📖</span>
                            <span className="font-bold text-sm text-amber-950 block group-hover:underline">Reading World</span>
                            <span className="text-xs text-amber-800/80 block leading-relaxed">Phonics, letter sounds, and word building.</span>
                        </Link>

                        <Link 
                            href="/student/subject/science"
                            className="p-6 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/80 rounded-3xl transition-all cursor-pointer space-y-2.5 shadow-2xs group block"
                        >
                            <span className="text-3xl block">🌱</span>
                            <span className="font-bold text-sm text-emerald-950 block group-hover:underline">Science World</span>
                            <span className="text-xs text-emerald-800/80 block leading-relaxed">Nature, animals, and exploring our environment.</span>
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
}