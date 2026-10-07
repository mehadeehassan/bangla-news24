import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  link?: string | null;
  firstPublished?: string | null;
}

interface NewsSectionProps {
  title: string;
  articles: Article[];
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return "";

  return new Date(date).toLocaleString("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const NewsSection = ({ title, articles }: NewsSectionProps) => {
  if (!articles?.length) return null;

  return (
    <section className="border-t border-slate-200 py-10">
      {/* Section Header */}
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-red-600" />

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
        </div>

        <span className="text-sm font-medium text-slate-400">
          {articles.length} টি খবর
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={
              article.type === "link" && article.link
                ? article.link
                : `/news/${article.id}`
            }
            target={article.type === "link" ? "_blank" : undefined}
            rel={article.type === "link" ? "noopener noreferrer" : undefined}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent opacity-80" />

              {/* Category */}
              <div className="absolute left-4 top-4">
                <span className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  {article.category}
                </span>
              </div>

              {/* Bottom Image Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                  <span className="h-1 w-1 rounded-full bg-red-400" />
                  <span>{formatDate(article.firstPublished)}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Title */}
              <h3 className="text-lg font-bold leading-7 text-slate-900 transition-colors duration-200 group-hover:text-red-600 sm:text-xl sm:leading-8">
                {article.title}
              </h3>

              {/* Description */}
              {article.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {article.description}
                </p>
              )}

              {/* Read More */}
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-red-600">
                <span>বিস্তারিত পড়ুন</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;