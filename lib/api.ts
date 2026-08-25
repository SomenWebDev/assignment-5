import type { ApiResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        message: data.message || "Something went wrong",
        data: data.data,
      };
    }

    return data;
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Unable to connect to the server",
      data: undefined as T,
    };
  }
}
