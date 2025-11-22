'use client'
import { useState } from 'react';

interface SetNewPasswordStepProps {
  onPasswordReset: () => void;
}

export default function SetNewPassword({ onPasswordReset }: SetNewPasswordStepProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      onPasswordReset();
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const hasMinLength = password.length >= 8;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set a new password</h1>
        <p className="text-gray-600">
          Create a new password. Ensure it differs from previous ones for security
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Re-enter password"
          />
        </div>

        <div className="border-t border-gray-200"></div>

        <button
          type="submit"
          disabled={!passwordsMatch || !hasMinLength}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}