import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import { getMyOrders } from "@/lib/api/rental";
import { getMyPayments } from "@/lib/api/payment";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CustomerDashboardPage() {
  const [orders, payments] = await Promise.all([
    getMyOrders(),
    getMyPayments(),
  ]);

  const totalOrders = orders.length;

  const activeRentals = orders.filter(
    (o) => o.status === "PAID" || o.status === "PICKED_UP",
  ).length;

  const pendingPayments = orders.filter((o) => o.status === "CONFIRMED").length;

  const totalSpent = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const stats = [
    {
      title: "Total Orders",
      value: String(totalOrders),
      description: "Rental orders placed",
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
      title: "Pending Payments",
      value: String(pendingPayments),
      description: "Orders awaiting payment",
      icon: CreditCard,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      title: "Total Spent",
      value: `৳${totalSpent.toFixed(2)}`,
      description: "Completed payments",
      icon: Wallet,
      iconClass: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shadow-lg sm:p-8">
        <p className="mb-2 text-sm font-medium text-emerald-100">
          GearUp Customer
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
          Track your rentals, payments, and reviews all in one place.
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
            Manage your rentals and payments quickly.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/gear">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Package className="mr-2 size-4" />
                Browse Gear
              </Button>
            </Link>

            <Link href="/dashboard/customer/orders">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                View My Orders
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>

            <Link href="/dashboard/customer/payments">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Payment History
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
