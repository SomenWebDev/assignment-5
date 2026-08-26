"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AuthSuccessToast() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "login") {
      toast.success("Welcome back!");
    }

    if (success === "register") {
      toast.success("Account created successfully!");
    }
  }, [success]);

  return null;
}
