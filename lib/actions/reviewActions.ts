"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api";
import type { IReview } from "@/lib/types";

export interface ReviewFormState {
  success: boolean;
  message: string;
  review?: IReview;
}

export async function createReviewAction(
  gearItemId: string,
  prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const rating = formData.get("rating") as string;
  const comment = formData.get("comment") as string;

  if (!rating) {
    return { success: false, message: "Please select a rating." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const result = await api<IReview>("/api/reviews", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      gearItemId,
      rating: Number(rating),
      comment: comment || undefined,
    }),
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    message: "Review submitted successfully!",
    review: result.data,
  };
}

export async function checkReviewedAction(
  gearItemId: string,
): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return false;

  try {
    const result = await api<{ reviewed: boolean }>(
      `/api/reviews/gear/${gearItemId}/mine`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!result.success) return false;
    return Boolean(result.data.reviewed);
  } catch {
    return false;
  }
}
