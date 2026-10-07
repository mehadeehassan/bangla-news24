import Image from "next/image";
import Link from "next/link";

interface News {
  source: string;
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNews = ({ mainNews }: { mainNews: News[] }) => {
  const [firstNews, ...otherNews] = mainNews;

  if (!firstNews) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-5 flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          প্রধান খবর
        </h2>

        <div className="h-1 flex-1 bg-red-600" />
      </div>

      {/* News Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Main News */}
        <Link
          href={`/news/${firstNews.id}`}
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Category */}
            <div className="absolute left-3 top-3">
              <span className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                {firstNews.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-xl font-bold leading-8 text-slate-900 transition group-hover:text-red-600 sm:text-2xl">
              {firstNews.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
              {firstNews.description}
            </p>

            <p className="mt-4 text-xs text-slate-400">
              {firstNews.source}
            </p>
          </div>
        </Link>

        {/* Other News */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {otherNews.slice(0, 4).map((item) => (
            <Link
              href={`/news/${item.id}`}
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Small Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <p className="mb-2 text-xs font-semibold text-red-600">
                  {item.category}
                </p>

                <h3 className="line-clamp-3 text-base font-bold leading-6 text-slate-800 transition group-hover:text-red-600">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;