import { cacheLife } from "next/cache";

export interface Headline {
  id: string;
  title: string;
}

export interface Article {
  id: string;
  title: string;
  description: string | null;
  body?: string | null;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

export interface NewsSection {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: Article[];
}

export interface MostReadNews {
  id: string;
  title: string;
}
export interface CategoryArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

export interface CategoryNewsResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  slug: string;
  topicId: string;
  title: string;
  page: number;
  pageCount: number;
  data: CategoryArticle[];
}

export async function getHeadlines() {
  "use cache";

  cacheLife("minutes");

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch headlines");
  }

  const data = await res.json();

  return data.data as Headline[];
}

export async function getNewsSections(): Promise<NewsSection[]> {
  "use cache";

  cacheLife("minutes");

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();

  return data.data as NewsSection[];
}

export async function getMostReadNews() {
  "use cache";

  cacheLife("minutes");

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch most read news");
  }

  const data = await res.json();

  return data.data as MostReadNews[];
}

export async function getCategoryNews(categoryId: string) {
  "use cache";

  cacheLife("minutes");

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch category news: ${res.status} ${res.statusText}`
    );
  }

  const data: CategoryNewsResponse = await res.json();

  return data;
}
export async function getNewsDetails(
  newsId: string
): Promise<Article | null> {
  "use cache";

  cacheLife("minutes");

  if (!/^[a-zA-Z0-9]+$/.test(newsId)) {
    return null;
  }

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsId)}`
  );

  if (res.status === 404) {
    return null;
  }

  if (res.status === 415) {
    const headlinesRes = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=100"
    );

    if (!headlinesRes.ok) {
      throw new Error(
        `Failed to fetch live news: ${headlinesRes.status} ${headlinesRes.statusText}`
      );
    }

    const headlinesData = await headlinesRes.json();
    return (
      headlinesData.data?.find(
        (item: Article) => item.id === newsId
      ) ?? null
    );
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch news article: ${res.status} ${res.statusText}`
    );
  }

  const response: {
    success: boolean;
    data: {
      id: string;
      title: string;
      link: string;
      firstPublished: string | null;
      lastPublished: string | null;
      topics: { name: string }[];
      imageUrl: string;
      text: string;
      source: string;
    } | null;
  } = await res.json();

  if (!response.success) {
    throw new Error("News article API returned an unsuccessful response");
  }

  const article = response.data;

  if (!article || article.id !== newsId) {
    return null;
  }

  return {
    id: article.id,
    title: article.title,
    description: null,
    body: article.text,
    link: article.link,
    imageUrl: article.imageUrl,
    imageAlt: article.title,
    category: article.topics.map((topic) => topic.name).join(" · "),
    type: "সংবাদ",
    isLive: false,
    firstPublished: article.firstPublished,
    lastPublished: article.lastPublished,
    source: article.source,
  } satisfies Article;
}