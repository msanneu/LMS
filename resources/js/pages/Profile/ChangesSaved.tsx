import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ChangesSaved() {
    // Sidebar starts open on desktop (>=768px) and hidden by default on mobile
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });
    
    // Notification Dropdown state & Ref for click-outside detection
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    // Automatically close notification dropdown when clicking anywhere outside
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

    // Mock notifications for the bell dropdown
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New lesson module uploaded for Grade 1 Mathematics', time: '10m ago', unread: true },
        { id: 2, text: 'SNED clinical validation review completed', time: '1h ago', unread: true },
        { id: 3, text: 'Weekly progress summary is ready', time: '1d ago', unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <>
            <Head title="Profile saved — San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex text-slate-700 overflow-x-hidden relative font-sans">
                
                {/* Mobile Backdrop Overlay when sidebar is open */}
                {sidebarOpen && (
                    <div 
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/10 z-40 md:hidden backdrop-blur-3xs transition-opacity"
                    />
                )}

                {/* Streamlined Sidebar matching AccountPreferences */}
                <aside className={`
                    fixed md:sticky top-0 h-screen z-50 bg-white border-r border-slate-200/70 p-4 md:p-5 flex flex-col justify-between transition-all duration-200 shrink-0 overflow-y-auto
                    ${sidebarOpen ? 'translate-x-0 w-64 shadow-sm md:shadow-none' : '-translate-x-full md:w-20 md:-translate-x-0'}
                `}>
                    
                    <div className="space-y-6">
                        {/* Brand Header with Integrated Hamburger Toggle */}
                        <div className={`flex items-center pb-4 border-b border-slate-100 ${sidebarOpen ? 'justify-between' : 'flex-col gap-3'}`}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 border border-slate-200/70 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                    SM
                                </div>
                                {sidebarOpen && (
                                    <div className="truncate">
                                        <span className="font-bold text-slate-900 block text-xs leading-tight">San Mateo</span>
                                        <span className="text-[11px] text-slate-500 font-medium">Elementary School</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Hamburger Toggle Button */}
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

                        {/* Search Bar at the Top of Sidebar */}
                        {sidebarOpen && (
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search workspace..." 
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        )}

                        <div>
                            {sidebarOpen && (
                                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                                    Navigation
                                </div>
                            )}

                            <nav className="space-y-1">
                                <a href="/account-preferences" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`} title="Profile & Preferences">
                                    <svg className="w-4 h-4 shrink-0 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {sidebarOpen && <span>Profile & Preferences</span>}
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Bottom Sidebar: Return to Home & Sign Out */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                        <Link 
                            href="/dashboard" 
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}
                            aria-label="Return to home"
                            title="Return to home"
                        >
                            <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {sidebarOpen && <span>Return to home</span>}
                        </Link>

                        <Link 
                            href="/login" 
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50/50 text-rose-600 font-medium text-xs border border-transparent hover:border-rose-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}
                            aria-label="Sign out"
                            title="Sign out"
                        >
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {sidebarOpen && <span>Sign out</span>}
                        </Link>

                        {sidebarOpen && (
                            <div className="text-[10px] text-slate-400 font-normal px-1 pt-1">
                                Inclusive LMS Portal
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-h-screen px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-6 flex flex-col justify-center py-3">
                    
                    {/* Mobile Menu Trigger & Notification Bar */}
                    <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="p-1.5 rounded-lg bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-xs font-medium cursor-pointer border border-slate-200 transition-all"
                            aria-label="Open Menu"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span>Menu</span>
                        </button>

                        {/* Mobile Notification Dropdown Button */}
                        <div className="relative shrink-0" ref={notifRef}>
                            <button 
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-all cursor-pointer relative text-xs font-medium shadow-2xs"
                                aria-label="Notifications"
                            >
                                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span>Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                )}
                            </button>

                            {/* Dropdown Panel */}
                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200/70 p-3 z-50">
                                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2">
                                        <span className="text-xs font-semibold text-slate-800">Notifications ({unreadCount})</span>
                                        <button onClick={markAllAsRead} className="text-[11px] text-[#4B8B6B] hover:underline font-medium cursor-pointer">Mark all read</button>
                                    </div>
                                    <div className="space-y-2 max-h-56 overflow-y-auto">
                                        {notifications.map(n => (
                                            <div key={n.id} className={`p-2 rounded-lg text-xs transition-colors border ${n.unread ? 'bg-emerald-50/50 border-emerald-100 font-medium' : 'bg-white border-slate-100 text-slate-500'}`}>
                                                <p className="leading-snug">{n.text}</p>
                                                <span className="text-[10px] text-slate-400 mt-0.5 block">{n.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Card Container */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200/70 p-6 sm:p-10 space-y-6 w-full">
                        
                        {/* Staff Account Banner Card */}
                        <div className="bg-white rounded-xl p-4 border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-slate-200/70 flex items-center justify-center text-emerald-800 font-bold text-xs shrink-0">
                                    TA
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-slate-900 text-sm truncate">Staff Account</span>
                                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded tracking-wide shrink-0 border border-emerald-200/60">
                                            Staff member
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium truncate block">name@school.edu.ph</span>
                                </div>
                            </div>

                            {/* Desktop Notification Bell Dropdown */}
                            <div className="relative shrink-0 hidden sm:block" ref={notifRef}>
                                <button 
                                    onClick={() => setNotifOpen(!notifOpen)}
                                    className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-all cursor-pointer relative text-xs font-medium shadow-2xs"
                                    aria-label="Notifications"
                                >
                                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span>Notifications</span>
                                    {unreadCount > 0 && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                    )}
                                </button>

                                {/* Dropdown Panel */}
                                {notifOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200/70 p-3 z-50">
                                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2">
                                            <span className="text-xs font-semibold text-slate-800">Notifications ({unreadCount})</span>
                                            <button onClick={markAllAsRead} className="text-[11px] text-[#4B8B6B] hover:underline font-medium cursor-pointer">Mark all read</button>
                                        </div>
                                        <div className="space-y-2 max-h-56 overflow-y-auto">
                                            {notifications.map(n => (
                                                <div key={n.id} className={`p-2 rounded-lg text-xs transition-colors border ${n.unread ? 'bg-emerald-50/50 border-emerald-100 font-medium' : 'bg-white border-slate-100 text-slate-500'}`}>
                                                    <p className="leading-snug">{n.text}</p>
                                                    <span className="text-[10px] text-slate-400 mt-0.5 block">{n.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Saved Success Content Area */}
                        <div className="bg-emerald-50/50 rounded-xl p-8 sm:p-12 border border-emerald-100 flex flex-col items-center justify-center text-center space-y-6">
                            
                            <div className="space-y-2 max-w-md">
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Profile saved</h1>
                                <p className="text-sm text-slate-600">Your account preferences have been successfully updated.</p>
                            </div>

                            {/* Single Return to Profile Action Button */}
                            <div className="flex items-center justify-center w-full max-w-xs pt-2">
                                <Link 
                                    href="/account-preferences"
                                    className="w-full min-h-[46px] py-3 px-6 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center text-sm cursor-pointer"
                                >
                                    Return to profile
                                </Link>
                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}