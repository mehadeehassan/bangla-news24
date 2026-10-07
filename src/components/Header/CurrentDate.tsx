import { cacheLife } from "next/cache";

const CurrentDate = async () => {
  "use cache";

  cacheLife("hours");

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
      {date}
    </p>
  );
};

export default CurrentDate;