import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-5 w-40" />

      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full rounded-2xl" />

        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="grid grid-cols-2 gap-4 p-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
