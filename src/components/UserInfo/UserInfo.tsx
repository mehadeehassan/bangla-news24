"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";

const UserInfoPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  console.log("USER SESSION:", session);
  console.log("IS PENDING:", isPending);

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
      </div>
    );
  }

  if (session?.user) {
    const userName = session.user.name || "User";
    const userImage = session.user.image;

    console.log("USER NAME:", userName);
    console.log("USER IMAGE:", userImage);

    const handleLogout = async () => {
      try {
        const { error } = await authClient.signOut();

        if (error) {
          toast.error(error.message || "লগআউট করতে সমস্যা হয়েছে");
          return;
        }

        toast.success("সফলভাবে লগআউট হয়েছে");

        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("লগআউট করতে সমস্যা হয়েছে");
      }
    };

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* User Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100 text-sm font-bold text-red-600">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={36}
                height={36}
                className="h-9 w-9 object-cover"
              />
            ) : (
              <span>{userName.charAt(0).toUpperCase()}</span>
            )}
          </div>

          {/* Name */}
          <span className="hidden max-w-32 truncate text-sm font-semibold text-slate-700 sm:block">
            {userName}
          </span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-md bg-red-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600 sm:text-sm"
        >
          <FiLogOut className="h-4 w-4" />
          <span>লগ আউট</span>
        </button>
      </div>
    );
  }

  // Logged out
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Link
        href="/signin"
        className="rounded-md px-2 py-1.5 text-xs font-medium transition hover:text-red-600 sm:px-4 sm:py-2 sm:text-sm"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-red-700 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfoPage;