"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api";

export interface UpdateUserStatusState {
  success: boolean;
  message: string;
}

export async function updateUserStatusAction(
  userId: string,
  status: "ACTIVE" | "SUSPENDED",
): Promise<UpdateUserStatusState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const result = await api(`/api/admin/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    message: `User ${status === "SUSPENDED" ? "suspended" : "activated"} successfully.`,
  };
}
