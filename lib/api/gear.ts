import { cookies } from "next/headers";

import type { GearFilters, GearListResponse, IGear } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/* =========================
   Provider: My Gears
========================= */

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

/* =========================
   Get Single Gear (public)
========================= */

export async function getGearById(id: string): Promise<IGear> {
  const response = await fetch(`${API_URL}/api/gear/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (response.status === 404) {
    throw new NotFoundError("Gear not found");
  }

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch gear");
  }

  return result.data;
}

/* =========================
   Public: Get All Gears
   With Search / Filters /
   Pagination
========================= */

export async function getGears(
  filters: GearFilters = {},
): Promise<GearListResponse> {
  const searchParams = new URLSearchParams();

  if (filters.page !== undefined) {
    searchParams.set("page", String(filters.page));
  }

  if (filters.limit !== undefined) {
    searchParams.set("limit", String(filters.limit));
  }

  if (filters.categoryId) {
    searchParams.set("categoryId", filters.categoryId);
  }

  if (filters.brand) {
    searchParams.set("brand", filters.brand);
  }

  if (filters.minPrice !== undefined) {
    searchParams.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.search) {
    searchParams.set("search", filters.search);
  }

  const queryString = searchParams.toString();

  const url = `${API_URL}/api/gear${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch gears");
  }

  return {
    gears: result.data,
    meta: result.meta,
  };
}
