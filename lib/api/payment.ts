import { cookies } from "next/headers";

import type { IPayment } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyPayments(): Promise<IPayment[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/api/payments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch payments");
  }

  return result.data;
}
