import { Package } from "lucide-react";

import { getGears } from "@/lib/api/gear";
import { getCategories } from "@/lib/api/category";

import GearFilters from "@/components/gear/GearFilters";
import GearGrid from "@/components/gear/GearGrid";
import GearPagination from "@/components/gear/GearPagination";

import { Card, CardContent } from "@/components/ui/card";

interface GearPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categoryId?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function GearPage({ searchParams }: GearPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const minPrice =
    params.minPrice && !Number.isNaN(Number(params.minPrice))
      ? Number(params.minPrice)
      : undefined;

  const maxPrice =
    params.maxPrice && !Number.isNaN(Number(params.maxPrice))
      ? Number(params.maxPrice)
      : undefined;

  const [{ gears, meta }, categories] = await Promise.all([
    getGears({
      page,
      limit: 10,
      search: params.search || undefined,
      categoryId: params.categoryId || undefined,
      brand: params.brand || undefined,
      minPrice,
      maxPrice,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Package className="size-6 text-emerald-600" />

            <h1 className="text-3xl font-bold tracking-tight">Explore Gear</h1>
          </div>

          <p className="mt-2 text-muted-foreground">
            Find the perfect sports and outdoor equipment for your next
            adventure.
          </p>
        </div>

        {/* Filters */}
        <GearFilters categories={categories} />

        {/* Gear */}
        {gears.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
                <Package className="size-8 text-emerald-600" />
              </div>

              <h2 className="text-xl font-semibold">No gear found</h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try changing your search or filter options.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Result Count */}
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {gears.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {meta.total}
              </span>{" "}
              {meta.total === 1 ? "gear" : "gears"}
            </p>

            {/* Gear Grid */}
            <GearGrid gears={gears} />

            {/* Pagination */}
            <GearPagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
            />
          </>
        )}
      </div>
    </main>
  );
}
