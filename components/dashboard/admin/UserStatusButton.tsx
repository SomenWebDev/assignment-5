"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, ShieldX } from "lucide-react";

import { updateUserStatusAction } from "@/lib/actions/adminActions";

import { Button } from "@/components/ui/button";

interface UserStatusButtonProps {
  userId: string;
  status: "ACTIVE" | "SUSPENDED";
}

export default function UserStatusButton({
  userId,
  status,
}: UserStatusButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    const newStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    startTransition(async () => {
      const result = await updateUserStatusAction(userId, newStatus);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  if (status === "ACTIVE") {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled={pending}
        onClick={handleToggle}
        className="border-red-200 text-red-600 hover:bg-red-50"
      >
        <ShieldX className="mr-2 size-4" />
        Suspend
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      disabled={pending}
      onClick={handleToggle}
      className="bg-emerald-600 hover:bg-emerald-700"
    >
      <ShieldCheck className="mr-2 size-4" />
      Activate
    </Button>
  );
}
