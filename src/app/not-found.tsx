import Link from 'next/link';
import { FiArrowLeft, FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="relative">
          <p className="text-8xl font-black tracking-tight text-red-600 sm:text-9xl">404</p>

          <div className="absolute inset-x-0 bottom-1 mx-auto h-3 max-w-32 rounded-full bg-red-100 blur-sm" />
        </div>

        {/* Content */}
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          খবরটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          দুঃখিত, আপনি যে পেজ বা খবরটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। এটি হয়তো সরিয়ে ফেলা হয়েছে অথবা
          লিংকটি সঠিক নয়।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <FiHome className="h-4 w-4" />
            হোমে ফিরে যান
          </Link>

          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiSearch className="h-4 w-4" />
            খবর দেখুন
          </Link>
        </div>

        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-red-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          আগের পেজে ফিরে যান
        </button>
      </div>
    </main>
  );
};

export default NotFound;
