import MainNews from "@/components/MainNews/MainNews";
import MostRead from "@/components/MostRead/MostRead";
import NewsSection from "@/components/NewsSection/NewsSection";
import { getNewsSections } from "@/lib/news";

const Home = async () => {
  const sections = await getNewsSections();

  const mainNews = sections[0]?.articles ?? [];

  return (
    <div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <MainNews mainNews={mainNews} />

          <div className="mt-8">
            {sections.slice(1).map((section) => (
              <NewsSection
                key={section.curationId}
                title={section.title}
                articles={section.articles}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block mt-10">
          <MostRead />
        </aside>
      </div>
    </div>
  );
};

export default Home;