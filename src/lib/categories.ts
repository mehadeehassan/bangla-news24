import { cacheLife } from "next/cache";

export interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export async function getCategories() {
  "use cache";

  cacheLife("hours");

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  const nav: Navs[] = data.data;

  return nav.filter(
    (item) => item.scrapable === true
  );
}