import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getNewsDetails } from "@/lib/news";

interface NewsDetailsPageProps {
  params: Promise<{
    newsId: string;
  }>;
}

const formatDate = (date: string | null) => {
  if (!date) return "";

  return new Date(date).toLocaleString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

// এই component-টাই একই page.tsx-এর ভিতরে থাকবে
const NewsDetailsContent = async ({
  params,
}: NewsDetailsPageProps) => {
  const { newsId } = await params;

  const news = await getNewsDetails(newsId);

  if (!news) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
      >
        ← হোমে ফিরে যান
      </Link>

      <div className="mb-4">
        <span className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
          {news.category}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {news.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span>{news.source}</span>

        <span>•</span>

        <span>{formatDate(news.firstPublished)}</span>

        {news.isLive && (
          <>
            <span>•</span>
            <span className="font-bold text-red-600">
              ● Live
            </span>
          </>
        )}
      </div>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {news.description && (
        <p className="mt-8 text-lg font-medium leading-8 text-slate-700 sm:text-xl sm:leading-9">
          {news.description}
        </p>
      )}

      {news.body && (
        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
          {news.body
            .split(/\n\s*\n/)
            .filter((paragraph) => paragraph.trim())
            .map((paragraph, index) => (
              <p key={`${news.id}-${index}`}>{paragraph}</p>
            ))}
        </div>
      )}

      <div className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          সংবাদ সম্পর্কে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-400">উৎস</p>
            <p className="mt-1 font-semibold text-slate-700">
              {news.source}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-400">বিভাগ</p>
            <p className="mt-1 font-semibold text-slate-700">
              {news.category}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-400">প্রকাশিত</p>
            <p className="mt-1 font-semibold text-slate-700">
              {formatDate(news.firstPublished)}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-400">ধরন</p>
            <p className="mt-1 font-semibold text-slate-700">
              {news.type}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-red-600 hover:text-red-600"
        >
          ← আরও খবর পড়ুন
        </Link>
      </div>
    </main>
  );
};

// এটিই actual route page
const NewsDetails = (props: NewsDetailsPageProps) => {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-32 rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-6 w-2/3 rounded bg-slate-200" />
            <div className="aspect-video rounded-2xl bg-slate-200" />
            <div className="h-5 w-full rounded bg-slate-200" />
            <div className="h-5 w-5/6 rounded bg-slate-200" />
          </div>
        </main>
      }
    >
      <NewsDetailsContent params={props.params} />
    </Suspense>
  );
};

export default NewsDetails;