'use client'
import { useState } from 'react';

interface VerifyOTPStepProps {
  email: string;
  onOtpVerify: (otp: string) => void;
  onResendEmail: () => void;
  loading: boolean;
}

export default function VerifyOTP({ email, onOtpVerify, onResendEmail,loading }: VerifyOTPStepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onOtpVerify(otpString);
    }
  };

  const maskedEmail = email ? `${email.substring(0, 3)}...${email.split('@')[1]}` : '';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-gray-600">
          We sent a reset link to <span className="font-semibold">{maskedEmail}</span>{' '}
          enter 6 digit code that mentioned in the email
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          ))}
        </div>
        <div className="border-t border-gray-200"></div>
        <button
          type="submit"
          disabled={otp.join('').length !== 6 || loading}
          className="w-full bg-[#DE3526] hover:bg-[#c02e21] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Verify OTP
        </button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Haven't got the email yet?
        <button
          type="button"
          onClick={onResendEmail}
          className="text-blue-600 hover:text-blue-500 font-medium underline cursor-pointer"
        >
          Resend email
        </button>
      </div>
    </div>
  );
}