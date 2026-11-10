import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ITSecurity() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [backupTriggered, setBackupTriggered] = useState<boolean>(false);

    const handleBackup = () => {
        setBackupTriggered(true);
        setTimeout(() => setBackupTriggered(false), 4000);
    };

    return (
        <>
            <Head title="Security & Backups — IT Portal · San Mateo Elementary School" />
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
                            <Link href="/it/overview" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Overview</Link>
                            <Link href="/it/network" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Network Infrastructure</Link>
                            <Link href="/it/security" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100">Security & Backups</Link>
                        </nav>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">Security & Backups / IT Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">IT</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">System Security & Database Backups</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage local MySQL snapshots, firewall rule auditing, and authentication security logs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200/70 shadow-sm space-y-4">
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase">Database Backup</span>
                            <h3 className="text-sm font-bold text-slate-900">MySQL Local Snapshot (Laragon)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Automatically backs up all learner profiles, IEP records, and lesson progress data to secure local storage.
                            </p>
                            {backupTriggered && (
                                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-medium">
                                    Manual database snapshot completed successfully!
                                </div>
                            )}
                            <button onClick={handleBackup} className="px-4 py-2 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm cursor-pointer">
                                Trigger manual database backup
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200/70 shadow-sm space-y-4">
                            <span className="text-[10px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase">Security Audit</span>
                            <h3 className="text-sm font-bold text-slate-900">Firewall & Port Security</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Inspect unauthorized connection attempts and monitor static MAC address port security enforcement across switches.
                            </p>
                            <button className="px-4 py-2 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-medium rounded-lg transition-all cursor-pointer">
                                Run security audit scan
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}