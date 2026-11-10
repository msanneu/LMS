import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <>
            <Head title="Set new password — San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                
                {/* Single-Card Centered Layout matching your authentication suite */}
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

                    <h1 className="text-xl font-bold text-slate-900 mb-1">Set new password</h1>
                    <p className="text-sm text-slate-500 mb-6">Enter your new password below to secure your account.</p>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <input type="hidden" name="token" value={data.token} />
                        <input type="hidden" name="email" value={data.email} />

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="password-input">New password</label>
                            <input 
                                id="password-input"
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 focus:outline-none text-sm bg-white transition-all" 
                                placeholder="At least 8 characters" 
                                aria-label="New password"
                                required
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="password-confirmation-input">Confirm password</label>
                            <input 
                                id="password-confirmation-input"
                                type="password" 
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 focus:outline-none text-sm bg-white transition-all" 
                                placeholder="Enter it again" 
                                aria-label="Confirm password"
                                required
                            />
                            {errors.password_confirmation && <p className="text-xs text-red-500 mt-1">{errors.password_confirmation}</p>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                aria-label="Reset password"
                                className="w-full min-h-[46px] py-3 px-4 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer">
                                Reset password
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