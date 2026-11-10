import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ParentFeedback() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [message, setMessage] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <>
            <Head title="Teacher Feedback — Parent Portal · San Mateo Elementary School" />
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
                            <Link href="/parent/overview" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Overview</Link>
                            <Link href="/parent/activities" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Home Activities</Link>
                            <Link href="/parent/feedback" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100">Teacher Feedback</Link>
                        </nav>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Teacher Feedback / Parent Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">P</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Teacher Communication & Observation Log</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Send observations or questions directly to Teacher Ana regarding home learning.</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-6 shadow-sm max-w-2xl">
                        {submitted ? (
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900">
                                <span className="font-bold block">Feedback sent successfully!</span>
                                <p>Teacher Ana has received your observation note and will review it shortly.</p>
                                <button onClick={() => { setSubmitted(false); setMessage(''); }} className="mt-2 px-3 py-1.5 bg-[#4B8B6B] text-white rounded-lg cursor-pointer">Send another note</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">Recipient</label>
                                    <input type="text" disabled value="Teacher Ana · Grade 1 Section A" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-500" />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">Observation or Question</label>
                                    <textarea 
                                        rows={4} 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Share how your child responded to today's home activities..."
                                        className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                    />
                                </div>
                                <button type="submit" className="px-5 py-2.5 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm cursor-pointer">
                                    Submit observation to teacher
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}