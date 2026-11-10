import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function AdminUsers() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

    return (
        <>
            <Head title="User Management — Admin Portal · San Mateo Elementary School" />
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
                            <Link href="/admin/overview" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Overview</Link>
                            <Link href="/admin/users" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-medium text-xs border border-emerald-100">User Management</Link>
                            <Link href="/admin/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-xs">Compliance Reports</Link>
                        </nav>
                    </div>
                </aside>

                <main className={`flex-1 py-6 px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-6 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="flex items-center justify-between bg-white p-3.5 sm:px-6 rounded-xl border border-slate-200/70 shadow-sm w-full">
                        <span className="text-xs font-semibold text-slate-500">User Management / Admin Portal</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">AD</div>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">System User Management</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage role permissions for teachers, SNED coordinators, parents, and learners.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm flex items-center justify-between gap-4">
                        <input type="text" placeholder="Search users by name or role..." className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                        <button className="px-4 py-2 bg-[#4B8B6B] hover:bg-[#3D7257] text-white text-xs font-medium rounded-lg transition-all shadow-sm shrink-0 cursor-pointer">+ Add New User</button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/70 p-6 space-y-4 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900">Active Directory Roster</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Name</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Role</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Assigned Section</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Teacher Ana</td>
                                        <td className="py-3.5 text-slate-600">Inclusive Teacher</td>
                                        <td className="py-3.5 text-slate-600">Grade 1 - Section A</td>
                                        <td className="py-3.5 text-emerald-700 font-semibold">Active</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Dr. Mendoza</td>
                                        <td className="py-3.5 text-slate-600">SNED Coordinator</td>
                                        <td className="py-3.5 text-slate-600">School-wide</td>
                                        <td className="py-3.5 text-emerald-700 font-semibold">Active</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3.5 font-bold text-slate-900">Mrs. Santos</td>
                                        <td className="py-3.5 text-slate-600">Parent / Guardian</td>
                                        <td className="py-3.5 text-slate-600">Mia Santos (Section A)</td>
                                        <td className="py-3.5 text-emerald-700 font-semibold">Active</td>
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