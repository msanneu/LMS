import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function SnedCoordinatorLearners() {
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
        { id: 1, text: 'IEP review pending for Mia Santos', time: '15m ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

    return (
        <>
            <Head title="SNED Learners Roster — SNED Coordinator Portal · San Mateo Elementary School" />
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
                            {sidebarOpen && <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">SNED Coordinator</div>}
                            <nav className="space-y-1">
                                <Link href="/sned-coordinator/overview" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Overview</Link>
                                <Link href="/sned-coordinator/learners" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Learners</Link>
                                <Link href="/sned-coordinator/validation-queue" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Validation Queue</Link>
                                <Link href="/sned-coordinator/analytics" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Analytics</Link>
                            </nav>
                        </div>
                    </div>
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 shrink-0 bg-white">
                        <Link href="/login" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Sign out</Link>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Learners / SNED Coordinator Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">SC</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">SNED Learners Roster</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage inclusion profiles, clinical accommodations, and IEP progress for Grade 1 learners.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm">
                        <input type="text" placeholder="Search by learner name, condition, or section..." className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-4 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900">Active Inclusion Cohort · Grade 1</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Learner</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Section</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Primary Support Needs</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Active Accommodations</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">IEP Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Mia Santos</td>
                                        <td className="py-3.5 text-slate-600">Section A</td>
                                        <td className="py-3.5 text-slate-600">Mild ASD (Sensory Pause)</td>
                                        <td className="py-3.5 text-emerald-700 font-medium">Audio prompt, Short steps</td>
                                        <td className="py-3.5 text-amber-700 font-semibold">Review Pending</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Noah Perez</td>
                                        <td className="py-3.5 text-slate-600">Section A</td>
                                        <td className="py-3.5 text-slate-600">ADHD (Focus Support)</td>
                                        <td className="py-3.5 text-emerald-700 font-medium">Extended timer</td>
                                        <td className="py-3.5 text-emerald-700 font-semibold">Validated</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Ava Reyes</td>
                                        <td className="py-3.5 text-slate-600">Section B</td>
                                        <td className="py-3.5 text-slate-600">Mild ASD (Visual Structuring)</td>
                                        <td className="py-3.5 text-emerald-700 font-medium">Pictorial cues</td>
                                        <td className="py-3.5 text-emerald-700 font-semibold">Validated</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}