import { cookies } from "next/headers";

import type { IGear } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyGears(): Promise<IGear[]> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/api/gear/provider/my-gear`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch your gear");
  }

  return result.data;
}

export async function getGearById(id: string): Promise<IGear> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_URL}/api/gear/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch gear");
  }

  return result.data;
}
