"use client";

import Link from "next/link";
import { useState } from "react";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

interface MobileMenuProps {
  navs: Navs[];
}

const MobileMenu = ({ navs }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-xl shadow-sm"
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-slate-200 bg-white p-3 shadow-xl">
          <nav className="flex flex-col">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 font-semibold hover:bg-slate-100 hover:text-red-600"
            >
              হোম
            </Link>

            {navs.map((item) => (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 hover:bg-slate-100 hover:text-red-600"
              >
                {item.title}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-200" />

            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 hover:bg-slate-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-red-700 px-4 py-3 text-center text-white hover:bg-red-600"
            >
              সাইন আপ
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;