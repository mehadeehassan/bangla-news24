import Link from "next/link";
import { getCategories } from "@/lib/categories";

const NavLinkPage = async () => {
  const filterNavs = await getCategories();

  return (
    <nav className="hidden border-t border-red-700 sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-3">
        <Link
          href="/"
          className="font-semibold transition hover:text-red-500"
        >
          হোম
        </Link>

        {filterNavs.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className="font-medium transition hover:text-red-500"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinkPage;