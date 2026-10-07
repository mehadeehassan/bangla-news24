import Link from "next/link";
import { getMostReadNews } from "@/lib/news";

const MostRead = async () => {
  const news = await getMostReadNews();

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-7 w-1 rounded-full bg-red-600" />

        <h2 className="text-xl font-bold text-slate-900">
          সর্বাধিক পঠিত
        </h2>
      </div>

      <div className="divide-y divide-slate-100">
        {news.map((item, index) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
              {index + 1}
            </div>

            <h3 className="text-sm font-semibold leading-6 text-slate-700 transition-colors group-hover:text-red-600">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default MostRead;