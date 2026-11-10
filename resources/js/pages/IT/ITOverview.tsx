import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function ITOverview() {
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
        { id: 1, text: 'Scheduled automated database backup completed successfully', time: '10m ago', unread: true },
        { id: 2, text: 'Cisco 2960 switch port security logs updated', time: '1h ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

    return (
        <>
            <Head title="Overview — IT & Infrastructure Portal · San Mateo Elementary School" />
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
                            {sidebarOpen && <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">IT Portal</div>}
                            <nav className="space-y-1">
                                <Link href="/it/overview" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Overview</Link>
                                <Link href="/it/network" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Network Infrastructure</Link>
                                <Link href="/it/security" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>Security & Backups</Link>
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
                            <span className="text-xs font-semibold text-slate-500">Overview / IT & Infrastructure Portal</span>
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
                                IT
                            </div>
                        </div>
                    </div>

                    {/* Greeting Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">IT Infrastructure Dashboard</h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">San Mateo Elementary School · System Architecture & Network Operations</p>
                        </div>
                        <Link href="/it/security" className="px-4 py-2.5 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer w-fit">
                            Check backup status
                        </Link>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Server Status</span>
                            <div className="text-2xl font-bold text-emerald-700">Online</div>
                            <span className="text-[11px] text-slate-400 block pt-1">Laravel & MySQL (Laragon)</span>
                        </div>
                        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-emerald-900">Network Uptime</span>
                            <div className="text-2xl font-bold text-emerald-950">99.9%</div>
                            <span className="text-[11px] text-emerald-800/80 block pt-1">Cisco VLAN trunking active</span>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-slate-500">Database Backups</span>
                            <div className="text-2xl font-bold text-slate-900">Synchronized</div>
                            <span className="text-[11px] text-slate-400 block pt-1">Automated daily snapshots</span>
                        </div>
                        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/60 shadow-2xs space-y-1">
                            <span className="text-xs font-medium text-emerald-900">Security Firewall</span>
                            <div className="text-2xl font-bold text-emerald-950">Secure</div>
                            <span className="text-[11px] text-emerald-800/80 block pt-1">Port security enabled</span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Left Column: Network Hardware Overview */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/70 p-6 space-y-4 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900">Hardware & Network Topology Status</h2>

                            <div className="space-y-3 text-xs">
                                <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="font-bold text-slate-900 block">Cisco 1941 Router (Core Gateway)</span>
                                        <p className="text-slate-600">Inter-VLAN routing subinterfaces active · IPv4/IPv6 pools operational.</p>
                                    </div>
                                    <span className="text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg shrink-0">Operational</span>
                                </div>

                                <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="font-bold text-slate-900 block">Cisco 2960 Switch (Laboratory Hub)</span>
                                        <p className="text-slate-600">802.1Q trunking configured · Static port security enforced.</p>
                                    </div>
                                    <span className="text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg shrink-0">Operational</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: IT Quick Actions */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200/70 p-5 space-y-3 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900">Infrastructure Tools</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Manage network routing protocols, inspect firewall security rules, or initiate manual system database backups.
                                </p>
                                <div className="space-y-2 pt-2">
                                    <Link href="/it/network" className="w-full py-2 px-3 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center shadow-sm">
                                        View network topology
                                    </Link>
                                    <Link href="/it/security" className="w-full py-2 px-3 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-medium rounded-lg transition-all flex items-center justify-center">
                                        Manage backups & security
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