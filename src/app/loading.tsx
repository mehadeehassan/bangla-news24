const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded-md bg-slate-200" />

        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-100" />
      </div>

      {/* Featured News Skeleton */}
      <section className="mb-10">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Large Featured Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="h-64 animate-pulse bg-slate-200 sm:h-80" />

            <div className="space-y-4 p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-7 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-7 w-4/5 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          {/* Side Featured Skeletons */}
          <div className="space-y-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="h-32 w-32 shrink-0 animate-pulse bg-slate-200 sm:h-36 sm:w-40" />

                <div className="flex flex-1 flex-col justify-center space-y-3 p-4">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

                  <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Latest News Heading */}
      <div className="mb-6">
        <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-slate-100" />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            {/* Image */}
            <div className="h-48 animate-pulse bg-slate-200" />

            {/* Content */}
            <div className="space-y-3 p-4">

              {/* Category */}
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

              {/* Title */}
              <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />

              {/* Description */}
              <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />

              {/* Date */}
              <div className="pt-2">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
};

export default Loading;

