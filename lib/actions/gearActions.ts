"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api";

export interface GearFormState {
  success: boolean;
  message: string;
}

export async function createGearAction(
  prevState: GearFormState,
  formData: FormData,
): Promise<GearFormState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const brand = formData.get("brand");
  const imageUrl = formData.get("imageUrl");
  const pricePerDay = formData.get("pricePerDay");
  const stock = formData.get("stock");
  const categoryId = formData.get("categoryId");
  const isAvailable = formData.get("isAvailable");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated.",
    };
  }

  const result = await api("/api/gear", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      name,
      description,
      brand,
      imageUrl,
      pricePerDay: Number(pricePerDay),
      stock: Number(stock),
      categoryId,
      isAvailable: isAvailable === "true",
    }),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  return {
    success: true,
    message: "Gear added successfully!",
  };
}

export async function updateGearAction(
  id: string,
  prevState: GearFormState,
  formData: FormData,
): Promise<GearFormState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const brand = formData.get("brand");
  const imageUrl = formData.get("imageUrl");
  const pricePerDay = formData.get("pricePerDay");
  const stock = formData.get("stock");
  const categoryId = formData.get("categoryId");
  const isAvailable = formData.get("isAvailable");

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated.",
    };
  }

  const result = await api(`/api/gear/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      description,
      brand,
      imageUrl,
      pricePerDay: Number(pricePerDay),
      stock: Number(stock),
      categoryId,
      isAvailable: isAvailable === "true",
    }),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  return {
    success: true,
    message: "Gear updated successfully!",
  };
}

export async function deleteGearAction(id: string): Promise<GearFormState> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated.",
    };
  }

  const result = await api(`/api/gear/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  return {
    success: true,
    message: "Gear deleted successfully!",
  };
}
