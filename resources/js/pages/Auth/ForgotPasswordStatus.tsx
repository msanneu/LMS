import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ForgotPasswordStatus() {
    return (
        <>
            <Head title="Check your email — San Mateo Elementary School" />
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

                    <h1 className="text-xl font-bold text-slate-900 mb-1">Check your email</h1>
                    <p className="text-sm text-slate-500 mb-8">If the address matches an account, a secure reset link is on its way.</p>

                    {/* Back to sign in button matching the exact primary button style */}
                    <div>
                        <Link 
                            href="/login"
                            aria-label="Back to sign in"
                            className="w-full min-h-[46px] py-3 px-4 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer text-sm text-center">
                            Back to sign in
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}