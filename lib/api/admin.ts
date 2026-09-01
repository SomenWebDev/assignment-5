import { cookies } from "next/headers";

import type { IAdminUser, IGear, IRentalOrder } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function adminGet<T>(endpoint: string): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Request failed");
  }

  return result.data;
}

export async function getAllUsers(): Promise<IAdminUser[]> {
  return adminGet<IAdminUser[]>("/api/admin/users");
}

export async function getAllRentalOrders(): Promise<IRentalOrder[]> {
  return adminGet<IRentalOrder[]>("/api/admin/rentals");
}

export async function getAllGearItems(): Promise<IGear[]> {
  return adminGet<IGear[]>("/api/admin/gear");
}
