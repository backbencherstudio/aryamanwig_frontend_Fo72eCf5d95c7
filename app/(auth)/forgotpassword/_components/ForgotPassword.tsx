'use client'

import { useState } from "react";

interface ForgotPasswordStepProps {
  onEmailSubmit: (email: string) => void;
  loading: boolean
}

export default function ForgotPassword({ onEmailSubmit,loading }: ForgotPasswordStepProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onEmailSubmit(email);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password</h1>
        <p className="text-gray-600">Please enter your email to reset the password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg transition-colors"
            placeholder="Enter your email"
          />
        </div>
        <div className="border-t border-gray-200"></div>
        <button
          type="submit"
          className={`w-full bg-[#DE3526] hover:bg-[#be2e21] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 ${loading?"cursor-not-allowed opacity-50":"cursor-pointer"}`}
        >
          {loading?"Sending...":"Send OTP"}
        </button>
      </form>
    </div>
  );
}