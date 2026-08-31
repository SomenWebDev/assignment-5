import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import { getMyGears } from "@/lib/api/gear";
import { getIncomingOrders } from "@/lib/api/rental";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProviderDashboardPage() {
  const [gears, orders] = await Promise.all([
    getMyGears(),
    getIncomingOrders(),
  ]);

  const activeRentals = orders.filter(
    (o) => o.status === "PAID" || o.status === "PICKED_UP",
  ).length;

  const pendingOrders = orders.filter((o) => o.status === "PLACED").length;

  const totalEarnings = orders
    .filter(
      (o) =>
        o.status === "PAID" ||
        o.status === "PICKED_UP" ||
        o.status === "RETURNED",
    )
    .reduce((sum, o) => sum + Number(o.totalAmount), 0);

  const stats = [
    {
      title: "Total Gear",
      value: String(gears.length),
      description: "Gear currently listed",
      icon: Package,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Active Rentals",
      value: String(activeRentals),
      description: "Currently rented gear",
      icon: ShoppingBag,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Orders",
      value: String(pendingOrders),
      description: "Orders awaiting action",
      icon: Clock3,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      title: "Total Earnings",
      value: `৳${totalEarnings.toFixed(2)}`,
      description: "Earnings from rentals",
      icon: TrendingUp,
      iconClass: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shadow-lg sm:p-8">
        <p className="mb-2 text-sm font-medium text-emerald-100">
          GearUp Provider
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Provider Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
          Manage your sports gear, rental orders, and business performance from
          one place.
        </p>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Overview</h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="border-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>

                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>

          <p className="text-sm text-muted-foreground">
            Manage your gear and rental orders quickly.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/provider/gear/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Package className="mr-2 size-4" />
                Add New Gear
              </Button>
            </Link>

            <Link href="/dashboard/provider/orders">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                View Orders
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-emerald-900">
              Ready to start renting?
            </h2>

            <p className="mt-1 text-sm text-emerald-700">
              Add your first sports or outdoor gear to GearUp.
            </p>
          </div>

          <Link href="/dashboard/provider/gear/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Add Gear
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
