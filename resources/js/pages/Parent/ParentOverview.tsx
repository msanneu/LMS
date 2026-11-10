import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function ParentOverview() {
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
        { id: 1, text: 'Teacher Ana logged a new observation for Mia S.', time: '30m ago', unread: true },
        { id: 2, text: 'New home-reinforcement activity unlocked: Counting to 5', time: '2h ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

    return (
        <>
            <Head title="Home Dashboard — Parent Portal · San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                
                {sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/10 z-40 md:hidden backdrop-blur-3xs transition-opacity" />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0
                    ${sidebarOpen ? 'w-64 shadow-sm md:shadow-none' : 'w-20'}
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
                            {sidebarOpen && <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Parent Portal</div>}
                            <nav className="space-y-1">
                                <Link href="/parent/overview" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Overview</Link>
                                <Link href="/parent/activities" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Home Activities</Link>
                                <Link href="/parent/feedback" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Teacher Feedback</Link>
                            </nav>
                        </div>
                    </div>
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 shrink-0 bg-white">
                        <Link href="/login" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Sign out</Link>
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
                            <span className="text-xs font-semibold text-slate-500">Overview / Parent Portal</span>
                        </div>

                        <div className="flex items-center gap-3">
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
                                P
                            </div>
                        </div>
                    </div>

                    {/* Greeting Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Welcome, Parent Guardian</h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Tracking progress and home-reinforcement activities for Mia Santos · Grade 1 Section A</p>
                        </div>
                        <Link href="/parent/activities" className="px-4 py-2.5 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer w-fit">
                            View home activities
                        </Link>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Weekly Lessons Completed</span>
                            <div className="text-2xl font-bold text-slate-900">4 / 5</div>
                            <span className="text-[11px] text-emerald-700 font-medium block pt-1">On track for this week</span>
                        </div>
                        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-emerald-900">Active Audio Accommodations</span>
                            <div className="text-2xl font-bold text-emerald-950">Enabled</div>
                            <span className="text-[11px] text-emerald-800/80 block pt-1">Customized for sensory pacing</span>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Teacher Communication</span>
                            <div className="text-2xl font-bold text-slate-900">Active</div>
                            <span className="text-[11px] text-slate-400 block pt-1">Connected with Teacher Ana</span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Left Column: Recent Learning Milestones */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/70 p-6 space-y-4 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900">Recent Milestones & Learning Progress</h2>

                            <div className="space-y-3 text-xs">
                                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="font-bold text-slate-900 block">Mathematics · Counting to 5</span>
                                        <p className="text-slate-600">Successfully completed with audio prompt scaffolding.</p>
                                    </div>
                                    <span className="text-emerald-800 font-semibold px-2.5 py-1 bg-white border border-emerald-200 rounded-lg shrink-0">Mastered</span>
                                </div>

                                <div className="p-4 bg-white border border-slate-200/70 rounded-xl flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="font-bold text-slate-900 block">Reading · Letter Sounds (A, B, C)</span>
                                        <p className="text-slate-600">Practiced with structured 2-minute pacing pauses.</p>
                                    </div>
                                    <span className="text-slate-600 font-semibold px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg shrink-0">In Progress</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Home Reinforcement Prompt */}
                        <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900">Home-Reinforcement Tip</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                You can reinforce counting at home using household objects like utensils or fruit during meals. Keep practice sessions short (5–10 minutes).
                            </p>
                            <div className="pt-2">
                                <Link href="/parent/feedback" className="w-full py-2 px-3 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-medium rounded-lg transition-all flex items-center justify-center">
                                    Send note to teacher
                                </Link>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}