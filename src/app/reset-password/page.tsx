'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FiAlertCircle, FiArrowLeft, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Token from Better Auth reset link
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {
      password: '',
      confirmPassword: '',
    };

    if (!formData.password) {
      newErrors.password = 'নতুন পাসওয়ার্ড দিন';
    } else if (formData.password.length < 6) {
      newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ডটি আবার লিখুন';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড দুটি মিলছে না';
    }

    setErrors(newErrors);

    return !newErrors.password && !newErrors.confirmPassword;
  };

  // Reset Password
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Password reset link পাওয়া যায়নি।');
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      toast.error('তথ্যগুলো সঠিকভাবে পূরণ করুন।');
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.resetPassword({
        newPassword: formData.password,
        token,
      });

      if (error) {
        console.error('Better Auth reset password error:', error);

        toast.error(error.message || 'পাসওয়ার্ড পরিবর্তন করা যায়নি। লিংকটি হয়তো expire হয়ে গেছে।');

        return;
      }

      toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন সাইন ইন করুন।');

      // Clear form
      setFormData({
        password: '',
        confirmPassword: '',
      });

      setErrors({
        password: '',
        confirmPassword: '',
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

      // Redirect to Sign In
      router.push('/signin');
    } catch (error) {
      console.error('Reset password error:', error);

      toast.error('পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // Invalid / Missing Token
  if (!token) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiAlertCircle className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Invalid Reset Link
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              এই password reset link টি invalid অথবা expire হয়ে গেছে। নতুন একটি reset link request
              করুন।
            </p>

            <Link
              href="/forgot-password"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              নতুন Reset Link নিন
            </Link>

            <Link
              href="/signin"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-red-600"
            >
              <FiArrowLeft className="h-4 w-4" />
              সাইন ইন পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FiLock className="h-6 w-6" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            নতুন পাসওয়ার্ড সেট করুন
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            আপনার অ্যাকাউন্টের জন্য একটি নতুন এবং নিরাপদ পাসওয়ার্ড সেট করুন।
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* New Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
              নতুন পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="নতুন পাসওয়ার্ড লিখুন"
                disabled={loading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                  errors.password
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
              >
                {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="পাসওয়ার্ডটি আবার লিখুন"
                disabled={loading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={loading}
                aria-label={showConfirmPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'পাসওয়ার্ড পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}
          </button>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-red-600"
            >
              <FiArrowLeft className="h-4 w-4" />
              সাইন ইন পেজে ফিরে যান
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
