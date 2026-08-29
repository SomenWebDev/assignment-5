import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import type { IGear } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GearGridProps {
  gears: IGear[];
}

export default function GearGrid({ gears }: GearGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                {gear.brand && <Badge variant="outline">{gear.brand}</Badge>}
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

              <Link href={`/gear/${gear.id}`}>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  View Details
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
