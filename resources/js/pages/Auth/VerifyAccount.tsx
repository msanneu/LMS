import React, { useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyAccount() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        const digit = value.replace(/[^0-9]/g, '').slice(-1);
        const newDigits = [...digits];
        newDigits[index] = digit;
        setDigits(newDigits);
        setData('code', newDigits.join(''));

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        const newDigits = [...digits];
        
        for (let i = 0; i < pastedData.length; i++) {
            newDigits[i] = pastedData[i];
        }
        
        setDigits(newDigits);
        setData('code', newDigits.join(''));

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/verify-account');
    };

    return (
        <>
            <Head title="Verify your account — San Mateo Elementary School" />
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
                    <p className="text-sm text-slate-500 mb-6">Enter the 6-digit code sent to your account email.</p>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-semibold text-slate-700">Verification code</label>
                                <button type="button" className="text-xs text-[#4B8B6B] hover:underline font-medium">
                                    Resend code
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between gap-2" onPaste={handlePaste}>
                                {digits.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleChange(index, e.target.value)}
                                        onKeyDown={e => handleKeyDown(index, e)}
                                        className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-bold bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded-lg transition-all shadow-2xs shrink-0"
                                        required
                                    />
                                ))}
                            </div>

                            {errors.code && <p className="text-xs text-red-500 mt-2">{errors.code}</p>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                aria-label="Verify account"
                                className="w-full min-h-[46px] py-3 px-4 bg-[#4B8B6B] hover:bg-[#3D7257] text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer">
                                Verify account
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