import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Level {
    id: number;
    title: string;
    desc: string;
    status: string;
    emoji: string;
}

interface SubjectProps {
    subject: {
        name: string;
        icon: string;
        levels: Level[];
    };
}

export default function SubjectLevels({ subject }: SubjectProps) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });

    const [audioLocked, setAudioLocked] = useState<boolean>(false);

    const playAudio = (text: string) => {
        if (audioLocked) return;
        if ('speechSynthesis' in window) {
            setAudioLocked(true);
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
            setTimeout(() => setAudioLocked(false), 5000);
        }
    };

    return (
        <>
            <Head title={`${subject.name} Adventures — Student Portal · San Mateo Elementary School`} />
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
                                <Link href="/student/activity" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100 transition-all ${!sidebarOpen && 'md:justify-center px-0'}`}>
                                    <svg className="w-4 h-4 shrink-0 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
                    
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <Link href="/student/dashboard" className="text-xs font-semibold text-[#4B8B6B] hover:underline flex items-center gap-1.5">
                            ← Back to Learning Home
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                            M
                        </div>
                    </div>

                    {/* Subject Banner */}
                    <div className="flex items-center justify-between bg-emerald-50/70 p-6 rounded-3xl border border-emerald-100 shadow-2xs">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                                <span className="text-3xl">{subject.icon}</span> {subject.name} World
                            </h1>
                            <p className="text-xs text-slate-600">Pick a fun level below to start playing!</p>
                        </div>
                        <button 
                            onClick={() => playAudio(`Welcome to ${subject.name} World! Choose a level to start playing.`)}
                            disabled={audioLocked}
                            className="px-4 py-2.5 bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl border border-emerald-200 transition-all cursor-pointer shadow-2xs flex items-center gap-2"
                        >
                            🔊 Listen
                        </button>
                    </div>

                    {/* Visual Level Grid Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subject.levels.map((lvl) => {
                            const isLocked = lvl.status === 'locked';
                            return (
                                <div 
                                    key={lvl.id}
                                    onClick={() => !isLocked && playAudio(lvl.title)}
                                    className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                                        isLocked 
                                            ? 'bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed' 
                                            : 'bg-white hover:bg-emerald-50/30 border-slate-200/80 shadow-sm cursor-pointer group hover:border-emerald-300'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="text-4xl p-3 bg-slate-50 rounded-2xl border border-slate-100 block">
                                            {lvl.emoji || '⭐'}
                                        </span>
                                        {isLocked ? (
                                            <span className="text-[10px] bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-bold">Locked 🔒</span>
                                        ) : (
                                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">Unlocked 🌟</span>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-base text-slate-900 group-hover:text-[#4B8B6B]">{lvl.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{lvl.desc}</p>
                                    </div>

                                    <div className="pt-2">
                                        {isLocked ? (
                                            <div className="w-full py-3 text-center text-xs text-slate-400 font-semibold bg-slate-100 rounded-xl">
                                                Complete previous level first
                                            </div>
                                        ) : (
                                            <Link 
                                                href={`/student/activity?subject=${subject.name.toLowerCase()}&level=${lvl.id}`}
                                                className="w-full py-3 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                                            >
                                                Play Level {lvl.id} 🚀
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </main>
            </div>
        </>
    );
}