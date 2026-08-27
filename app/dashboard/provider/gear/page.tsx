import Link from "next/link";
import Image from "next/image";
import { Package, Plus, Pencil } from "lucide-react";

import { getMyGears } from "@/lib/api/gear";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteGearButton from "@/components/dashboard/provider/DeleteGearButton";

export default async function ProviderGearPage() {
  const gears = await getMyGears();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="size-6 text-emerald-600" />

            <h1 className="text-3xl font-bold tracking-tight">My Gear</h1>
          </div>

          <p className="mt-2 text-muted-foreground">
            Manage the sports and outdoor gear you have listed for rental.
          </p>
        </div>

        <Link href="/dashboard/provider/gear/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 size-4" />
            Add New Gear
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      {gears.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
              <Package className="size-8 text-emerald-600" />
            </div>

            <h2 className="text-xl font-semibold">No gear listed yet</h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Start adding your sports and outdoor equipment to make them
              available for rental.
            </p>

            <Link href="/dashboard/provider/gear/new" className="mt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 size-4" />
                Add Your First Gear
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Gear Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {gears.length}
              </span>{" "}
              {gears.length === 1 ? "gear" : "gears"}
            </p>
          </div>

          {/* Gear Cards */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {gears.map((gear) => (
              <Card
                key={gear.id}
                className="group overflow-hidden border-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {gear.imageUrl ? (
                    <Image
                      src={gear.imageUrl}
                      alt={gear.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="size-12 text-slate-300" />
                    </div>
                  )}

                  {/* Availability */}
                  <div className="absolute right-3 top-3">
                    {gear.isAvailable ? (
                      <Badge className="border-0 bg-emerald-600 text-white hover:bg-emerald-600">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="space-y-4 p-5">
                  {/* Title + Price */}
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h2 className="line-clamp-1 text-lg font-semibold">
                        {gear.name}
                      </h2>

                      <span className="shrink-0 text-lg font-bold text-emerald-600">
                        ৳{gear.pricePerDay}
                        <span className="text-xs font-normal text-muted-foreground">
                          /day
                        </span>
                      </span>
                    </div>

                    {/* Category + Brand */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        {gear.category.name}
                      </Badge>

                      {gear.brand && (
                        <Badge variant="outline">{gear.brand}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {gear.description || "No description available."}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>

                      <p className="font-semibold">
                        {gear.stock} {gear.stock === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {/* Edit */}
                      <Link href={`/dashboard/provider/gear/${gear.id}/edit`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </Link>

                      {/* Delete */}
                      <DeleteGearButton gearId={gear.id} gearName={gear.name} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
