import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <>
            <Head title="Reset password — San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                
                {/* Single-Card Centered Layout matching Login & Activate Account */}
                <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 sm:p-10 border border-slate-200/70">
                    
                    {/* Institutional Header */}
                    <div className="flex items-center gap-3.5 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm shrink-0">
                            SM
                        </div>
                        <div>
                            <span className="font-bold text-slate-900 block text-lg leading-tight">San Mateo Elementary School</span>
                            <span className="text-xs text-slate-500 font-medium">Inclusive LMS & SNED Portal</span>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 mb-1">Reset your password</h1>
                    <p className="text-sm text-slate-500 mb-6">We'll email a secure link to your school account.</p>

                    {status && (
                        <div className="mb-4 text-xs font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="email-input">School email</label>
                            <input 
                                id="email-input"
                                type="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 focus:outline-none text-sm bg-white transition-all" 
                                placeholder="name@school.edu.ph" 
                                aria-label="School email address"
                                required
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                aria-label="Send reset link"
                                className="w-full min-h-[46px] py-3 px-4 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer">
                                Send reset link
                            </button>
                        </div>
                    </form>

                    {/* Footer Back Link */}
                    <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                        <Link href="/login" className="text-xs font-medium text-[#4B8B6B] hover:underline inline-block">
                            ← Back to sign in
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}