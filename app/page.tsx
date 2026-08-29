import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  CalendarDays,
  CreditCard,
  Package,
} from "lucide-react";

import { getGears } from "@/lib/api/gear";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  const { gears: featuredGears } = await getGears({
    page: 1,
    limit: 6,
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-emerald-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div>
              <Badge className="mb-5 border-0 bg-emerald-100 px-4 py-2 text-emerald-700 hover:bg-emerald-100">
                Your next adventure starts here
              </Badge>

              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Rent the gear.
                <span className="block text-emerald-600">
                  Enjoy the adventure.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Discover quality sports and outdoor equipment without the hassle
                of buying. Rent what you need and explore more.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/gear">
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 px-6 hover:bg-emerald-700 sm:w-auto"
                  >
                    Browse Gear
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-6 sm:w-auto"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Trust Points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Quality gear
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Easy rental
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Secure payment
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-xl">
                {featuredGears[0]?.imageUrl ? (
                  <Image
                    src={featuredGears[0].imageUrl}
                    alt={featuredGears[0].name}
                    width={900}
                    height={650}
                    className="h-[320px] w-full object-cover sm:h-[420px]"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center sm:h-[420px]">
                    <Package className="size-20 text-slate-400" />
                  </div>
                )}
              </div>

              {/* Floating Price Card */}
              {featuredGears[0] && (
                <div className="absolute -bottom-5 left-4 rounded-2xl border bg-white p-4 shadow-lg sm:left-8">
                  <p className="text-xs text-slate-500">Featured gear</p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {featuredGears[0].name}
                  </p>

                  <p className="mt-1 font-bold text-emerald-600">
                    ৳{featuredGears[0].pricePerDay}
                    <span className="text-xs font-normal text-slate-500">
                      /day
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Featured Gear
            </h2>

            <p className="mt-2 max-w-xl text-slate-600">
              Get ready for your next adventure with our popular sports and
              outdoor equipment.
            </p>
          </div>

          <Link
            href="/gear"
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View all gear
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        {featuredGears.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGears.map((gear) => (
              <Link key={gear.id} href={`/gear/${gear.id}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
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
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                          {gear.name}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                            {gear.category.name}
                          </Badge>

                          {gear.brand && (
                            <Badge variant="outline">{gear.brand}</Badge>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="font-bold text-emerald-600">
                          ৳{gear.pricePerDay}
                        </p>

                        <p className="text-xs text-slate-500">per day</p>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                      {gear.description ||
                        "Quality gear for your next adventure."}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed py-16 text-center">
            <Package className="mx-auto size-12 text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold">
              No gear available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check back soon for new rental equipment.
            </p>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Simple process
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              How GearUp Works
            </h2>

            <p className="mt-3 text-slate-600">
              Renting your next adventure gear is simple and hassle-free.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Search className="size-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">1. Find Your Gear</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Browse our collection and find the perfect equipment for your
                adventure.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CalendarDays className="size-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                2. Choose Your Dates
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select your rental dates and make sure the gear is available
                when you need it.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CreditCard className="size-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">3. Rent & Enjoy</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete your secure payment and get ready for your adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why GearUp */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Why GearUp
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Everything you need for your next adventure
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              GearUp makes outdoor equipment rental simple. Find reliable
              equipment, choose your dates, pay securely, and enjoy your
              adventure without having to buy expensive gear.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border p-6">
              <ShieldCheck className="size-8 text-emerald-600" />

              <h3 className="mt-4 font-semibold">Secure & Reliable</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Secure rental and payment experience from start to finish.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <Package className="size-8 text-emerald-600" />

              <h3 className="mt-4 font-semibold">Quality Equipment</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Find equipment suitable for sports, camping and outdoor trips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready for your next adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-emerald-50">
            Explore our gear collection and find everything you need for your
            next trip.
          </p>

          <Link href="/gear" className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-white px-7 text-emerald-700 hover:bg-emerald-50"
            >
              Browse All Gear
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
