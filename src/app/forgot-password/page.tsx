"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    // Email Validation
    if (!trimmedEmail) {
      setError("ইমেইল দিন");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("সঠিক ইমেইল দিন");
      return;
    }

    try {
      setLoading(true);

      // Better Auth - Request Password Reset
      const { error } = await authClient.requestPasswordReset({
        email: trimmedEmail,
        redirectTo: "/reset-password",
      });

      // Better Auth Error
      if (error) {
        toast.error(
          error.message ||
            "পাসওয়ার্ড রিসেট লিংক পাঠানো যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      // Success
      toast.success(
        "পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।",
      );

      setEmail("");
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        "পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FiMail className="h-6 w-6" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            পাসওয়ার্ড ভুলে গেছেন?
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            আপনার অ্যাকাউন্টের ইমেইল দিন। আমরা আপনার পাসওয়ার্ড
            রিসেট করার জন্য একটি লিংক পাঠাব।
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Email */}
          <div>
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
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="আপনার ইমেইল লিখুন"
              disabled={loading}
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              }`}
            />

            {error && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "লিংক পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
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

export default ForgotPasswordPage;

