"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api";

export interface CreatePaymentResult {
  success: boolean;
  message: string;
  checkoutUrl?: string;
}

export async function createPaymentAction(
  rentalOrderId: string,
): Promise<CreatePaymentResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const result = await api<{ checkoutUrl: string; sessionId: string }>(
    "/api/payments/create",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ rentalOrderId }),
    },
  );

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    message: "Redirecting to payment...",
    checkoutUrl: result.data.checkoutUrl,
  };
}
