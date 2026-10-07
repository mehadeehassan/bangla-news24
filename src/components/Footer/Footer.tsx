import Link from "next/link";
import { getCategories } from "@/lib/categories";

const Footer = async () => {
  "use cache";

  const categories = await getCategories();

  // Footer-এ সর্বোচ্চ 4টা category দেখাবে
  const footerMenus = categories.slice(0, 2);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-white"
            >
              Bangla<span className="text-red-600">News24</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              দেশ ও বিশ্বের সর্বশেষ সংবাদ, গুরুত্বপূর্ণ খবর এবং
              আপডেটেড তথ্য সহজ ও সুন্দরভাবে পাঠকদের কাছে পৌঁছে দেওয়াই
              আমাদের লক্ষ্য।
            </p>
          </div>

          {/* Important Menu */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              গুরুত্বপূর্ণ বিভাগ
            </h2>

            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm transition hover:text-red-500"
              >
                হোম
              </Link>

              {footerMenus.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="text-sm transition hover:text-red-500"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact / Info */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              BanglaNews24
            </h2>

            <div className="space-y-3 text-sm text-slate-400">
              <p>
                সর্বশেষ খবর পেতে আমাদের সাথেই থাকুন।
              </p>

              <p>
                নির্ভরযোগ্য সংবাদ, দ্রুত আপডেট।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            &copy; {currentYear}{" "}
            <span className="font-medium text-slate-300">
              BanglaNews24
            </span>
            . All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            সকল স্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;