import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function SnedCoordinatorOverview() {
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
        { id: 1, text: 'IEP review pending for Mia Santos (Grade 1 - Section A)', time: '15m ago', unread: true },
        { id: 2, text: 'New clinical accommodation flagged by Dr. Mendoza', time: '2h ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <>
            <Head title="Overview — SNED Coordinator Portal · San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                
                {sidebarOpen && (
                    <div 
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/10 z-40 md:hidden backdrop-blur-3xs transition-opacity"
                    />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0
                    ${sidebarOpen ? 'w-64 shadow-sm md:shadow-none' : 'w-20'}
                `}>
                    <div className="space-y-6 overflow-y-auto overflow-x-hidden flex-1 pr-1">
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
                                    SNED Coordinator
                                </div>
                            )}

                            <nav className="space-y-1">
                                <Link href="/sned-coordinator/overview" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                                    {sidebarOpen && <span>Overview</span>}
                                </Link>
                                <Link href="/sned-coordinator/learners" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                    {sidebarOpen && <span>Learners</span>}
                                </Link>
                                <Link href="/sned-coordinator/validation-queue" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    {sidebarOpen && <span>Validation Queue</span>}
                                </Link>
                                <Link href="/sned-coordinator/analytics" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                                    {sidebarOpen && <span>Analytics</span>}
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100 shrink-0 bg-white">
                        <Link href="/login" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                            {sidebarOpen && <span>Sign out</span>}
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-50 border border-slate-200 cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>
                            <span className="text-xs font-semibold text-slate-500">Overview / SNED Coordinator Portal</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative hidden sm:block">
                                <input type="text" placeholder="Search learner profiles..." className="w-56 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400" />
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
                                SC
                            </div>
                        </div>
                    </div>

                    {/* Greeting Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">SNED Coordinator Dashboard</h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">San Mateo Elementary School · Special Education & Inclusion Unit</p>
                        </div>
                        <Link href="/sned-coordinator/validation-queue" className="px-4 py-2.5 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer w-fit">
                            Review pending IEP validations
                        </Link>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Active SNED Learners</span>
                            <div className="text-2xl font-bold text-slate-900">18</div>
                            <span className="text-[11px] text-emerald-700 font-medium block pt-1">Grade 1 Inclusion Cohort</span>
                        </div>
                        <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-amber-900">IEP Reviews Pending</span>
                            <div className="text-2xl font-bold text-amber-950">4</div>
                            <span className="text-[11px] text-amber-800/80 block pt-1">Requires clinical sign-off</span>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Accommodations Active</span>
                            <div className="text-2xl font-bold text-slate-900">32</div>
                            <span className="text-[11px] text-slate-400 block pt-1">Audio prompts & pauses</span>
                        </div>
                        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-emerald-900">Compliance Rate</span>
                            <div className="text-2xl font-bold text-emerald-950">94.5%</div>
                            <span className="text-[11px] text-emerald-800/80 block pt-1">DepEd standards</span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Left: Pending Validation Queue Preview */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/70 p-5 sm:p-6 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900">IEP & Accommodation Validation Queue</h2>
                                    <p className="text-xs text-slate-500">Recent submissions awaiting coordinator approval</p>
                                </div>
                                <Link href="/sned-coordinator/validation-queue" className="text-xs text-[#4B8B6B] hover:underline font-semibold">View all</Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                            <th className="pb-3 uppercase tracking-wider text-[10px]">Learner</th>
                                            <th className="pb-3 uppercase tracking-wider text-[10px]">Accommodation</th>
                                            <th className="pb-3 uppercase tracking-wider text-[10px]">Submitted By</th>
                                            <th className="pb-3 uppercase tracking-wider text-[10px]">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3.5 font-bold text-slate-900">Mia Santos</td>
                                            <td className="py-3.5 text-slate-600">Audio prompt & step pacing</td>
                                            <td className="py-3.5 text-slate-600">Teacher Ana</td>
                                            <td className="py-3.5 text-amber-700 font-semibold">Pending Review</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3.5 font-bold text-slate-900">Noah Perez</td>
                                            <td className="py-3.5 text-slate-600">Extended response timer</td>
                                            <td className="py-3.5 text-slate-600">Teacher Ana</td>
                                            <td className="py-3.5 text-emerald-700 font-semibold">Approved</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Column: Quick Actions */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200/70 p-5 space-y-3 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900">Inclusion Support Focus</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Grade 1 cohort is currently emphasizing foundational reading and numeracy accommodations with automated multi-sensory prompts.
                                </p>
                                <div className="pt-2">
                                    <Link href="/sned-coordinator/learners" className="w-full py-2 px-3 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-medium rounded-lg transition-all flex items-center justify-center">
                                        Manage SNED learners roster
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}