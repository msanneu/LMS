import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
}

export default function StudentDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });
    
    const [notifOpen, setNotifOpen] = useState<boolean>(false);
    const [breakModal, setBreakModal] = useState<boolean>(false);
    const [audioLocked, setAudioLocked] = useState<boolean>(false);
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
        { id: 1, text: 'Teacher Ana unlocked a new math game for you!', time: '10m ago', unread: true },
        { id: 2, text: 'You earned a new star badge for counting!', time: '1h ago', unread: true },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

    const playAudioInstructions = (subjectName?: string) => {
        if (audioLocked) return;

        if ('speechSynthesis' in window) {
            setAudioLocked(true);
            window.speechSynthesis.cancel();

            const text = subjectName 
                ? `Let's explore ${subjectName}! Choose a level when you are ready.` 
                : "Hi Mia! Ready for one short lesson? Choose a subject above or start your next mission.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);

            setTimeout(() => {
                setAudioLocked(false);
            }, 5000);
        }
    };

    return (
        <>
            <Head title="Learn — Student Portal · San Mateo Elementary School" />
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

                                {/* Fixed link to point to the dedicated Subjects Hub */}
                                <Link href="/student/subjects" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs border border-transparent hover:border-slate-200/70 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
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
                            <span className="text-xs font-semibold text-slate-500">Learn / Student Portal</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative" ref={notifRef}>
                                <button onClick={() => setNotifOpen(!notifOpen)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer relative">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
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
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                                M
                            </div>
                        </div>
                    </div>

                    {/* Greeting Section with Integrated Desktop Notification Bell & User Icon */}
                    <div className="flex items-center justify-between pt-1">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Hi, Mia!</h1>
                            <p className="text-sm text-slate-500 mt-1">Ready for one short lesson?</p>
                        </div>

                        {/* Desktop-only notification bell and user profile */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="relative" ref={notifRef}>
                                <button onClick={() => setNotifOpen(!notifOpen)} className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 cursor-pointer relative shadow-2xs">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
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

                            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200 shadow-2xs">
                                M
                            </div>
                        </div>
                    </div>

                    {/* SUBJECTS CARDS SECTION */}
                    <div className="space-y-3">
                        <div>
                            <h2 className="text-sm font-bold text-slate-900">Choose a subject</h2>
                            <p className="text-xs text-slate-500">Pick a subject to start exploring.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link 
                                href="/student/subject/math"
                                onClick={() => playAudioInstructions('Math')}
                                className="p-5 bg-sky-50/80 hover:bg-sky-100 border border-sky-200/80 rounded-2xl transition-all cursor-pointer space-y-1.5 shadow-2xs group block"
                            >
                                <span className="text-2xl block">🔢</span>
                                <span className="font-bold text-xs text-sky-950 block group-hover:underline">Math</span>
                                <span className="text-[10px] text-sky-800/80 block">Numbers & Counting</span>
                            </Link>

                            <Link 
                                href="/student/subject/reading"
                                onClick={() => playAudioInstructions('Reading')}
                                className="p-5 bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 rounded-2xl transition-all cursor-pointer space-y-1.5 shadow-2xs group block"
                            >
                                <span className="text-2xl block">📖</span>
                                <span className="font-bold text-xs text-amber-950 block group-hover:underline">Reading</span>
                                <span className="text-[10px] text-amber-800/80 block">Letter Sounds</span>
                            </Link>

                            <Link 
                                href="/student/subject/science"
                                onClick={() => playAudioInstructions('Science')}
                                className="p-5 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/80 rounded-2xl transition-all cursor-pointer space-y-1.5 shadow-2xs group block"
                            >
                                <span className="text-2xl block">🌱</span>
                                <span className="font-bold text-xs text-emerald-950 block group-hover:underline">Science</span>
                                <span className="text-[10px] text-emerald-800/80 block">Nature & Animals</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Grid: Lesson Card + Support Widget */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Left: Your Next Lesson */}
                        <div className="lg:col-span-2 bg-[#F3F0FB] p-8 rounded-3xl border border-indigo-100/60 space-y-6 shadow-2xs">
                            <span className="text-[11px] font-bold text-indigo-700 tracking-wider uppercase">Your Next Lesson</span>
                            
                            <div className="space-y-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Count the stars</h2>
                                <p className="text-xs text-slate-500 font-medium">Math · About 5 minutes</p>
                            </div>

                            <div className="space-y-2">
                                <div className="w-full bg-white/70 h-2.5 rounded-full overflow-hidden border border-indigo-100">
                                    <div className="bg-indigo-400 h-full rounded-full w-1/3"></div>
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium block">Step 1 of 3</span>
                            </div>

                            <div className="pt-2">
                                <Link href="/student/activity" className="inline-flex items-center justify-center px-6 py-3 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                    Start lesson
                                </Link>
                            </div>
                        </div>

                        {/* Right: Audio Scaffolding & Sensory Pause Card */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 space-y-6 shadow-2xs">
                            
                            {/* Listen to Instructions */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs">
                                        🔊
                                    </div>
                                    <span className="text-xs font-bold text-slate-900">Listen to instructions</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Audio is here when you need it.
                                </p>
                                <button 
                                    onClick={() => playAudioInstructions()}
                                    disabled={audioLocked}
                                    className={`w-full py-2 text-xs font-semibold rounded-xl transition-all ${
                                        audioLocked 
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 cursor-pointer'
                                    }`}
                                >
                                    {audioLocked ? 'Playing Audio... ⏳' : 'Play Audio 🎧'}
                                </button>
                            </div>

                            <div className="border-t border-slate-100 pt-6 space-y-3">
                                <span className="text-xs font-bold text-slate-900 block">Need a break?</span>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    You can pause at any time.
                                </p>
                                <button 
                                    onClick={() => setBreakModal(true)}
                                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#4B8B6B] border border-emerald-600/40 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                >
                                    Take a break
                                </button>
                            </div>

                        </div>

                    </div>

                </main>
            </div>

            {/* Take a Break / Sensory Pause Modal */}
            {breakModal && (
                <div className="fixed inset-0 bg-slate-900/30 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-xl border border-slate-200">
                        <span className="text-4xl block">🧘</span>
                        <h3 className="text-base font-bold text-slate-900">Time for a Calm Break</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Take a slow, deep breath in... and let it out. Rest your eyes for 2 minutes. You're doing wonderful!
                        </p>
                        <button 
                            onClick={() => setBreakModal(false)}
                            className="w-full py-2.5 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-all"
                        >
                            I'm ready to keep playing 🌟
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}