import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShieldCheck,
  Star as StarIcon,
  Tag,
  User,
} from "lucide-react";

import { getGearById, NotFoundError } from "@/lib/api/gear";
import { getCurrentUser } from "@/lib/auth";
import { getGearReviews } from "@/lib/api/review";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RentGearForm from "@/components/gear/RentGearForm";

interface GearDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  const { id } = await params;

  let gear;

  try {
    gear = await getGearById(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw error;
  }

  const [user, reviews] = await Promise.all([
    getCurrentUser(),
    getGearReviews(id),
  ]);

  const canRent = !user || user.role === "CUSTOMER";

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/gear"
          className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Explore Gear
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            {gear.imageUrl ? (
              <Image
                src={gear.imageUrl}
                alt={gear.name}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="size-20 text-slate-300" />
              </div>
            )}

            <div className="absolute right-4 top-4">
              {gear.isAvailable ? (
                <Badge className="border-0 bg-emerald-600 text-white hover:bg-emerald-600">
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive">Unavailable</Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  <Tag className="mr-1 size-3" />
                  {gear.category.name}
                </Badge>

                {gear.brand && <Badge variant="outline">{gear.brand}</Badge>}
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                {gear.name}
              </h1>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-600">
                  ৳{gear.pricePerDay}
                </span>
                <span className="text-muted-foreground">/ day</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 font-semibold">Description</h2>
              <p className="leading-6 text-muted-foreground">
                {gear.description || "No description provided for this gear."}
              </p>
            </div>

            {/* Specs */}
            <Card className="border-0 shadow-sm">
              <CardContent className="grid grid-cols-2 gap-4 p-5">
                <div>
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className="font-semibold">
                    {gear.stock} {gear.stock === 1 ? "item" : "items"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-semibold">{gear.category.name}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Brand</p>
                  <p className="font-semibold">{gear.brand || "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold">
                    {gear.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Provider info */}
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                  <User className="size-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Listed by</p>
                  <p className="font-semibold">
                    {gear.provider?.name ?? "Unknown"}
                  </p>
                </div>
                <ShieldCheck className="ml-auto size-5 text-emerald-600" />
              </CardContent>
            </Card>

            {/* Rent section — role-aware */}
            {canRent ? (
              user ? (
                <RentGearForm
                  gearId={gear.id}
                  pricePerDay={gear.pricePerDay}
                  stock={gear.stock}
                  isAvailable={gear.isAvailable}
                />
              ) : (
                <Link href={`/auth/login?redirect=/gear/${gear.id}`}>
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Login to Rent
                  </Button>
                </Link>
              )
            ) : (
              <div className="rounded-lg border border-dashed bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {user.role === "PROVIDER"
                    ? "Providers cannot rent gear. Switch to a customer account to rent."
                    : "This account cannot rent gear."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>

          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No reviews yet for this gear.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm">
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{review.customer.name}</p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`size-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
