"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import type { AuthData, IUser } from "@/lib/types";

interface FormState {
  success: boolean;
  message: string;
}

async function setAuthCookies(data: AuthData) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  await setAuthCookies(result.data);

  redirect("/dashboard?success=login");
}

export async function registerAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const result = await api<{ user: IUser }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const loginResult = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!loginResult.success) {
    return {
      success: false,
      message: "Account created. Please login.",
    };
  }

  await setAuthCookies(loginResult.data);

  redirect("/dashboard?success=register");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/auth/login");
}
