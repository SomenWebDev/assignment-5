import Link from "next/link";
import {
  ArrowUpRight,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  getAllUsers,
  getAllGearItems,
  getAllRentalOrders,
} from "@/lib/api/admin";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const [users, gears, orders] = await Promise.all([
    getAllUsers(),
    getAllGearItems(),
    getAllRentalOrders(),
  ]);

  const totalUsers = users.length;
  const totalGear = gears.length;
  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((o) => o.payment?.status === "COMPLETED")
    .reduce((sum, o) => sum + Number(o.totalAmount), 0);

  const stats = [
    {
      title: "Total Users",
      value: String(totalUsers),
      description: "Registered accounts",
      icon: Users,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Gear",
      value: String(totalGear),
      description: "Listed across the platform",
      icon: Package,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Orders",
      value: String(totalOrders),
      description: "Rental orders placed",
      icon: ShoppingBag,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toFixed(2)}`,
      description: "From completed payments",
      icon: TrendingUp,
      iconClass: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shadow-lg sm:p-8">
        <p className="mb-2 text-sm font-medium text-emerald-100">
          GearUp Admin
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Admin Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
          Platform-wide overview of users, gear, and rental activity.
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
            Manage users, gear, and orders across the platform.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/admin/users">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Users className="mr-2 size-4" />
                Manage Users
              </Button>
            </Link>

            <Link href="/dashboard/admin/gear">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                View All Gear
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>

            <Link href="/dashboard/admin/orders">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                View All Orders
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
