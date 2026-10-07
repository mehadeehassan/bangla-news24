import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategoryNews } from "@/lib/news";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const formatDate = (date: string | null) => {
  if (!date) return "";

  return new Date(date).toLocaleString("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const CategoryContent = async ({
  params,
}: CategoryPageProps) => {
  const { categoryId } = await params;

  const category = await getCategoryNews(categoryId);

  if (!category || !category.data?.length) {
    notFound();
  }

  const [featuredNews, ...otherNews] = category.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ==================== CATEGORY HEADER ==================== */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="h-9 w-1 rounded-full bg-red-600" />

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {category.title}
          </h1>
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
          <span>{category.count} টি খবর</span>

          <span>•</span>

          <span>পৃষ্ঠা {category.page}</span>
        </div>
      </div>

      {/* ==================== FEATURED NEWS ==================== */}
      <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Featured Image */}
        <Link
          href={`/news/${featuredNews.id}`}
          className="group relative block overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-100">

            <Image
              src={featuredNews.imageUrl}
              alt={featuredNews.imageAlt || featuredNews.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category */}
            <span className="absolute left-5 top-5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
              {featuredNews.category}
            </span>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">

              <p className="mb-2 text-xs text-white/70">
                {formatDate(featuredNews.firstPublished)}
              </p>

              <h2 className="text-2xl font-extrabold leading-9 text-white transition-colors group-hover:text-red-300 sm:text-3xl">
                {featuredNews.title}
              </h2>

            </div>
          </div>
        </Link>

        {/* Featured Details */}
        <div className="flex flex-col justify-center">

          <span className="mb-4 text-sm font-bold text-red-600">
            {featuredNews.category}
          </span>

          <h2 className="text-2xl font-extrabold leading-9 text-slate-900 sm:text-3xl">
            {featuredNews.title}
          </h2>

          {featuredNews.description && (
            <p className="mt-4 text-base leading-8 text-slate-500">
              {featuredNews.description}
            </p>
          )}

          <div className="mt-5 text-sm text-slate-400">
            {formatDate(featuredNews.firstPublished)}
          </div>

          <Link
            href={`/news/${featuredNews.id}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            বিস্তারিত পড়ুন

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>
      </section>

      {/* ==================== LATEST NEWS ==================== */}
      {otherNews.length > 0 && (
        <section className="border-t border-slate-200 pt-8">

          {/* Section Title */}
          <div className="mb-7 flex items-center gap-3">

            <span className="h-7 w-1 rounded-full bg-red-600" />

            <h2 className="text-2xl font-extrabold text-slate-900">
              সর্বশেষ খবর
            </h2>

          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">

            {otherNews.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group"
              >

                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100">

                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-md bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    {article.category}
                  </span>

                </div>

                {/* Content */}
                <div className="pt-4">

                  {/* Date */}
                  <p className="mb-2 text-xs text-slate-400">
                    {formatDate(article.firstPublished)}
                  </p>

                  {/* Title */}
                  <h3 className="line-clamp-3 text-xl font-bold leading-8 text-slate-900 transition-colors group-hover:text-red-600">
                    {article.title}
                  </h3>

                  {/* Description */}
                  {article.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {article.description}
                    </p>
                  )}

                  {/* Read More */}
                  <div className="mt-3 flex items-center gap-1 text-sm font-bold text-red-600">
                    <span>বিস্তারিত পড়ুন</span>

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </div>

              </Link>
            ))}

          </div>
        </section>
      )}

    </main>
  );
};

const CategoryPage = (props: CategoryPageProps) => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-500">
          খবর লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent params={props.params} />
    </Suspense>
  );
};

export default CategoryPage;