import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-72" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Gear Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-sm">
            {/* Image */}
            <Skeleton className="h-52 w-full rounded-none" />

            <CardHeader className="space-y-3">
              {/* Gear name */}
              <Skeleton className="h-6 w-3/4" />

              {/* Category */}
              <Skeleton className="h-4 w-24" />
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Price + Stock */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Skeleton className="h-9 flex-1 rounded-md" />
                <Skeleton className="h-9 flex-1 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
