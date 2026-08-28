import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Skeleton className="h-7 w-40 rounded-full" />

            <Skeleton className="mt-6 h-12 w-full max-w-2xl" />
            <Skeleton className="mt-3 h-12 w-4/5 max-w-xl" />

            <Skeleton className="mt-6 h-5 w-full max-w-xl" />
            <Skeleton className="mt-2 h-5 w-4/5 max-w-lg" />

            <div className="mt-8 flex gap-3">
              <Skeleton className="h-11 w-32" />
              <Skeleton className="h-11 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-80 max-w-full" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="overflow-hidden rounded-xl border">
              <Skeleton className="aspect-[16/10] w-full" />

              <div className="space-y-4 p-5">
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-20" />
                </div>

                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
