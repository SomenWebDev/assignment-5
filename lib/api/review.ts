import type { IReview } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGearReviews(gearItemId: string): Promise<IReview[]> {
  const response = await fetch(`${API_URL}/api/reviews/gear/${gearItemId}`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch reviews");
  }

  return result.data;
}
