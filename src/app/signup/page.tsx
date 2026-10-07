"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

const SignUpPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      [name]: "",
    }));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "আপনার নাম দিন";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "ইমেইল দিন";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  // Email & Password Sign Up
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("ফর্মের তথ্যগুলো সঠিকভাবে পূরণ করুন");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        callbackURL: "/signin",
      });

      // Better Auth Error
      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে",
        );
        return;
      }

      // Registration Successful
      if (data) {
        toast.success(
          `স্বাগতম ${formData.name.trim()}! 🎉 অ্যাকাউন্ট তৈরি হয়েছে।`,
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setShowPassword(false);
        setShowConfirmPassword(false);

        router.push("/signin");
      }
    } catch (error) {
      console.error("Sign up error:", error);

      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে",
        );

        setLoading(false);
      }
    } catch (error) {
      console.error("Google sign up error:", error);

      toast.error("Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে");

      setLoading(false);
    }
  };

  // GitHub Sign Up
  const handleGithubSignUp = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে",
        );

        setLoading(false);
      }
    } catch (error) {
      console.error("GitHub sign up error:", error);

      toast.error("GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে");

      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            একাউন্ট খুলুন
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            BanglaNews24-এ আপনার নতুন একাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              disabled={loading}
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mt-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
              disabled={loading}
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              }`}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="একটি পাসওয়ার্ড দিন"
                autoComplete="new-password"
                disabled={loading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.password}
              </p>
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
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                autoComplete="new-password"
                disabled={loading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                disabled={loading}
                aria-label={
                  showConfirmPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
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
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "একাউন্ট তৈরি হচ্ছে..."
              : "একাউন্ট তৈরি করুন"}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              অথবা
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGoogle className="text-sm" />
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              disabled={loading}
              onClick={handleGithubSignUp}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGithub className="text-sm" />
              GitHub
            </button>
          </div>

          {/* Sign In */}
          <p className="mt-6 text-center text-sm text-slate-500">
            ইতিমধ্যে একাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-red-600 transition hover:text-red-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;