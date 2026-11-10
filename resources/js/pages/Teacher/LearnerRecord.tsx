import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function TeacherLearnerRecord() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });
    
    const [notifOpen, setNotifOpen] = useState<boolean>(false);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setNotifOpen(false);
            }
        };
        if (notifOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notifOpen]);

    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, text: 'New classroom observation note logged for Mia S.', time: '10m ago', unread: true },
        { id: 2, text: 'SNED validation review completed for Grade 1 math', time: '1h ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <>
            <Head title="Mia Santos · Learner record — Teacher Portal · San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                
                {sidebarOpen && (
                    <div 
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/10 z-40 md:hidden backdrop-blur-3xs transition-opacity"
                    />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed md:sticky top-0 h-screen z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0 overflow-y-auto
                    ${sidebarOpen ? 'translate-x-0 w-64 shadow-sm md:shadow-none' : '-translate-x-full md:w-20 md:-translate-x-0'}
                `}>
                    <div className="space-y-6">
                        <div className={`flex items-center pb-4 border-b border-slate-100 ${sidebarOpen ? 'justify-between' : 'flex-col gap-3'}`}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 border border-slate-200/70 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                    SM
                                </div>
                                {sidebarOpen && (
                                    <div className="truncate">
                                        <span className="font-bold text-slate-900 block text-xs leading-tight">LearnPath</span>
                                        <span className="text-[11px] text-slate-500 font-medium">San Mateo Elementary</span>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shrink-0 border border-transparent hover:border-slate-200/70"
                                aria-label="Toggle Sidebar"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {sidebarOpen && (
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        )}

                        <div>
                            {sidebarOpen && (
                                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                                    Teacher
                                </div>
                            )}

                            <nav className="space-y-1">
                                <Link href="/teacher/overview" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                                    {sidebarOpen && <span>Overview</span>}
                                </Link>
                                <Link href="/teacher/learners" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                    {sidebarOpen && <span>Learners</span>}
                                </Link>
                                <Link href="/teacher/lessons" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                    {sidebarOpen && <span>Lessons</span>}
                                </Link>
                                <Link href="/teacher/observations" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                                    {sidebarOpen && <span>Observations</span>}
                                </Link>
                                <Link href="/teacher/reports" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                                    {sidebarOpen && <span>Reports</span>}
                                </Link>
                                <Link href="/teacher/schedule" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                    {sidebarOpen && <span>Schedule</span>}
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                        <Link href="/login" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                            {sidebarOpen && <span>Sign out</span>}
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-50 border border-slate-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>
                            <span className="text-xs font-semibold text-slate-500">Learners / Teacher</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative hidden sm:block">
                                <input type="text" placeholder="Search..." className="w-56 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                            </div>
                            
                            <div className="relative" ref={notifRef}>
                                <button onClick={() => setNotifOpen(!notifOpen)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold cursor-pointer">
                                    {unreadCount}
                                </button>
                                {notifOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200/70 p-3 z-50">
                                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2">
                                            <span className="text-xs font-semibold text-slate-800">Notifications ({unreadCount})</span>
                                            <button onClick={markAllAsRead} className="text-[11px] text-[#4B8B6B] hover:underline font-medium cursor-pointer">Mark all read</button>
                                        </div>
                                        <div className="space-y-2 max-h-56 overflow-y-auto">
                                            {notifications.map(n => (
                                                <div key={n.id} className={`p-2 rounded-lg text-xs border ${n.unread ? 'bg-emerald-50/50 border-emerald-100 font-medium' : 'bg-white border-slate-100 text-slate-500'}`}>
                                                    <p className="leading-snug">{n.text}</p>
                                                    <span className="text-[10px] text-slate-400 mt-0.5 block">{n.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                                TA
                            </div>
                        </div>
                    </div>

                    {/* Page Header */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Mia Santos · learner record</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Grade 1 · Section A · Updated today</p>
                    </div>

                    {/* Main Content Grid: Learning Progress (Left) & Classroom Supports (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Left: Learning Progress & Recent Activities */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/70 p-6 space-y-6 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900">Learning progress</h2>

                            {/* Progress Section */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-slate-800">Math · Count objects to five</span>
                                    <span className="text-slate-500">4 of 5 milestones complete</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-[#4B8B6B] h-full rounded-full w-4/5"></div>
                                </div>
                            </div>

                            {/* Recent Activities Section */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">Recent activities</h3>

                                <div className="space-y-3 text-xs">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="font-semibold text-slate-800">Count the stars</span>
                                        <span className="text-slate-600 font-medium">Completed - today</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="font-semibold text-slate-800">Number match</span>
                                        <span className="text-amber-700 font-medium">Needs one more try</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="font-semibold text-slate-800">Count the pictures</span>
                                        <span className="text-slate-600 font-medium">Completed - yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Classroom Supports & Staff Observation */}
                        <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-6 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900">Classroom supports</h2>

                            {/* Support Toggles List */}
                            <div className="space-y-3 text-xs">
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-200 shrink-0"></span>
                                    <span className="text-slate-700 font-medium">Short activities</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 shrink-0"></span>
                                    <span className="text-slate-700 font-medium">Audio prompt available</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-200 shrink-0"></span>
                                    <span className="text-slate-700 font-medium">Offer a pause between steps</span>
                                </div>
                            </div>

                            {/* Staff Observation Card */}
                            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                                <span className="font-bold text-slate-900 block">Staff observation</span>
                                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    Mia benefits from one clear instruction at a time.
                                </p>
                            </div>

                            <div className="pt-2">
                                <Link href="/teacher/learners" className="w-full py-2.5 px-3 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-medium rounded-lg transition-all flex items-center justify-center cursor-pointer">
                                    Back to roster
                                </Link>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}