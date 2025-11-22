'use client';

import { useState } from 'react';
import ForgotPassword from './_components/ForgotPassword';
import VerifyOTP from './_components/VerifyOTP';
import SetNewPassword from './_components/ResetPassword';
import { UserService } from '@/userservice/user.service';
import toast, { Toaster } from 'react-hot-toast';

export type ForgotPasswordStep = 'forgot-password' | 'verify-otp' | 'set-new-password';

export default function Page() {
    const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('forgot-password');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleEmailSubmit = async (userEmail: string) => {
        setLoading(true);
        try {
            const res = await UserService?.sendCodeForgotPassword({ email: userEmail });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setEmail(userEmail);
                setCurrentStep('verify-otp');
            } else {
                toast.error(res?.data?.message)
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    const handleOtpVerify = async (verificationOtp: string) => {
        setLoading(true)
        try {
            const res = await UserService?.validateCode({
                email,
                token: verificationOtp
            });
            if (!res?.data?.success) {
                setOtp(verificationOtp);
                setCurrentStep('set-new-password');
            }else{
                toast.error(res?.data?.message)
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    const handlePasswordReset = () => {
        console.log('Password reset successful');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Toaster position='top-right' />
            <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8">
                {currentStep === 'forgot-password' && (
                    <ForgotPassword onEmailSubmit={handleEmailSubmit} loading={loading} />
                )}

                {currentStep === 'verify-otp' && (
                    <VerifyOTP
                        email={email}
                        onOtpVerify={handleOtpVerify}
                        onResendEmail={() => handleEmailSubmit(email)}
                        loading={loading}
                    />
                )}

                {currentStep === 'set-new-password' && (
                    <SetNewPassword onPasswordReset={handlePasswordReset} />
                )}
            </div>
        </div>
    );
}