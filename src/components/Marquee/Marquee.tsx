import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getHeadlines } from "@/lib/news";

const MarqueePage = async () => {
  const headlines = await getHeadlines();

  return (
    <div className="bg-red-700 text-white">
      <div className="mx-auto flex max-w-7xl">
        <div className="shrink-0 bg-red-800 px-5 py-1 font-bold">
          সর্বশেষ
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            className="whitespace-nowrap py-1"
            direction="right"
            duration={15}
          >
            {headlines.map((headline) => (
              <Link
                key={headline.id}
                href={`/news/${headline.id}`}
                className="hover:underline"
              >
                <span>{headline.title}</span>
                <span className="mx-5">•</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default MarqueePage;