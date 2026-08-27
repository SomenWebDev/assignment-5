import type { ICategory } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<ICategory[]> {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch categories");
  }

  return result.data;
}
