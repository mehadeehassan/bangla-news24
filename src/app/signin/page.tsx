'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';

const SignInPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      email: '',
      password: '',
    };

    if (!formData.email.trim()) {
      newErrors.email = 'ইমেইল দিন';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল দিন';
    }

    if (!formData.password) {
      newErrors.password = 'পাসওয়ার্ড দিন';
    } else if (formData.password.length < 6) {
      newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  // Email & Password Sign In
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error('ফর্মের তথ্যগুলো সঠিকভাবে পূরণ করুন');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        callbackURL: '/',
      });

      // Better Auth Error
      if (error) {
        toast.error(error.message || 'ইমেইল অথবা পাসওয়ার্ড ভুল');
        return;
      }

      // Login Successful
      if (data) {
        toast.success(`স্বাগতম ${data.user?.name || 'User'}! 🎉 লগইন সফল হয়েছে।`);

        setFormData({
          email: '',
          password: '',
        });

        setShowPassword(false);

        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Sign in error:', error);

      toast.error('সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || 'Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে');

        setLoading(false);
      }
    } catch (error) {
      console.error('Google sign in error:', error);

      toast.error('Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে');

      setLoading(false);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || 'GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে');

        setLoading(false);
      }
    } catch (error) {
      console.error('GitHub sign in error:', error);

      toast.error('GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে');

      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">সাইন ইন</h1>

          <p className="mt-2 text-sm text-slate-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল লিখুন"
              disabled={loading}
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
              }`}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-5">
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                disabled={loading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                  errors.password
                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                }`}
              />

              {/* Show / Hide Password */}
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
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-red-600 transition hover:text-red-700 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'সাইন ইন হচ্ছে...' : 'সাইন ইন করুন'}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">অথবা</span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGoogle className="text-sm" />
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGithub className="text-sm" />
              GitHub
            </button>
          </div>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-slate-500">
            একাউন্ট নেই?{' '}
            <Link href="/signup" className="font-bold text-red-600 transition hover:text-red-700">
              একাউন্ট খুলুন
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;
