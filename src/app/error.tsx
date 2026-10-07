"use client";

import Link from "next/link";
import { FiRefreshCcw, FiHome, FiAlertTriangle } from "react-icons/fi";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <FiAlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          কিছু একটা সমস্যা হয়েছে
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          সংবাদটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা হোমপেজে ফিরে
          যান।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto"
          >
            <FiRefreshCcw className="h-4 w-4" />
            আবার চেষ্টা করুন
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-red-600 hover:text-red-600 sm:w-auto"
          >
            <FiHome className="h-4 w-4" />
            হোমে ফিরে যান
          </Link>
        </div>

        {/* Error ID */}
        {error.digest && (
          <p className="mt-8 text-xs text-slate-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
};

export default ErrorPage;