import Link from "next/link";
import { LogOut, Package } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/authActions";

import { Button } from "@/components/ui/button";

export default async function PublicNavbar() {
  const user = await getCurrentUser();

  const dashboardPath = user
    ? `/dashboard/${user.role.toLowerCase()}`
    : "/auth/login";

  const roleLabel =
    user?.role === "CUSTOMER"
      ? "Customer"
      : user?.role === "PROVIDER"
        ? "Provider"
        : user?.role === "ADMIN"
          ? "Admin"
          : "";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Package className="size-5" />
            </div>

            <span className="text-xl font-bold tracking-tight">GearUp</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
            >
              Home
            </Link>

            <Link
              href="/gear"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
            >
              Browse Gear
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                {/* User Info */}
                <div className="mr-1 flex items-center gap-2">
                  <p className="max-w-32 truncate text-sm font-semibold">
                    {user.name}
                  </p>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {roleLabel}
                  </span>
                </div>

                {/* Dashboard */}
                <Link href={dashboardPath}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>

                {/* Sign Out */}
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                {/* Login */}
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>

                {/* Register */}
                <Link href="/auth/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 md:hidden">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex min-w-0 items-center gap-2">
                  <p className="max-w-24 truncate text-sm font-semibold">
                    {user.name}
                  </p>

                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    {roleLabel}
                  </span>
                </div>

                {/* Dashboard */}
                <Link href={dashboardPath}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>

                {/* Sign Out */}
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="size-4" />
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
