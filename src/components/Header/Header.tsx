import { getCategories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import NavLinkPage from "../Navigation/NavLinkPage";
import UserInfoPage from "../UserInfo/UserInfo";
import CurrentDate from "./CurrentDate";

const HeaderPage = async () => {
  const filterNavs = await getCategories();

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Top */}
        <div className="relative flex min-h-18 items-center justify-center py-3">
          {/* Logo + Website Info */}
          <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/GlobeLogo.png"
              alt="Bangla News 24"
              width={100}
              height={100}
              priority
              className="h-16 w-16 sm:h-25 sm:w-25"
            />

            <div className="flex flex-col">
              <h1 className="whitespace-nowrap font-serif text-[20px] font-bold leading-6 tracking-tight sm:text-[24px]">
                Bangla<span className="text-red-600">News24</span>
              </h1>

              <CurrentDate />
            </div>
          </div>
          </Link>
          {/* Desktop User */}
          <div className="absolute right-0 hidden sm:block">
            <UserInfoPage />
          </div>

          {/* Mobile Toggle */}
          <div className="absolute right-0 sm:hidden">
            <MobileMenu navs={filterNavs} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavLinkPage />
      </div>
    </header>
  );
};

export default HeaderPage;