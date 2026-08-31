"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api";
import type { IRentalOrder } from "@/lib/types";

export interface RentalFormState {
  success: boolean;
  message: string;
  order?: IRentalOrder;
}

interface ZodIssueLike {
  path: string;
  message: string;
}

export async function createRentalAction(
  gearItemId: string,
  prevState: RentalFormState,
  formData: FormData,
): Promise<RentalFormState> {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const quantity = formData.get("quantity") as string;

  if (!startDate || !endDate) {
    return { success: false, message: "Please select both dates." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const result = await api<IRentalOrder>("/api/rentals", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      startDate,
      endDate,
      items: [
        {
          gearItemId,
          quantity: Number(quantity) || 1,
        },
      ],
    }),
  });

  if (!result.success) {
    let message = result.message;

    if (Array.isArray(result.errorDetails)) {
      message = (result.errorDetails as ZodIssueLike[])
        .map((e) => `${e.path}: ${e.message}`)
        .join(", ");
    }

    return { success: false, message };
  }

  return {
    success: true,
    message: "Rental order placed successfully!",
    order: result.data,
  };
}

export interface UpdateStatusState {
  success: boolean;
  message: string;
}

export async function updateOrderStatusAction(
  orderId: string,
  status: "CONFIRMED" | "CANCELLED" | "PICKED_UP" | "RETURNED",
): Promise<UpdateStatusState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const result = await api(`/api/rentals/${orderId}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return { success: true, message: `Order marked as ${status}.` };
}
