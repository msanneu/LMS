import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ActivateAccount() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/activate-account');
    };

    return (
        <>
            <Head title="Activate your invited account — San Mateo Elementary School" />
            <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                
                {/* Single Unified Card Container */}
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-slate-200/70">
                    {/* Header inside the card */}
                    <div className="flex items-center gap-3.5 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm shrink-0">
                            SM
                        </div>
                        <div>
                            <span className="font-bold text-slate-900 block text-lg leading-tight">San Mateo Elementary School</span>
                            <span className="text-xs text-slate-500 font-medium">Inclusive LMS & SNED Portal</span>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 mb-1">Activate your invited account</h1>
                    <p className="text-sm text-slate-500 mb-6">Your school has invited you to join a workspace. Access is assigned by your school.</p>

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
                                placeholder="ana@school.edu.ph" 
                                aria-label="School email address"
                                required
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="password-input">Create password</label>
                            <input 
                                id="password-input"
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 focus:outline-none text-sm bg-white transition-all" 
                                placeholder="At least 8 characters" 
                                aria-label="Create password"
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
                                aria-label="Activate account"
                                className="w-full min-h-[46px] py-3 px-4 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer">
                                Activate account
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