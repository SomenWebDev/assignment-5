import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  switch (user.role) {
    case "CUSTOMER":
      redirect("/dashboard/customer");

    case "PROVIDER":
      redirect("/dashboard/provider");

    case "ADMIN":
      redirect("/dashboard/admin");

    default:
      redirect("/auth/login");
  }
}
