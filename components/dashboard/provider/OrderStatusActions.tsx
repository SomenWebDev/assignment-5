"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, PackageCheck, RotateCcw, XCircle } from "lucide-react";

import { updateOrderStatusAction } from "@/lib/actions/rentalActions";
import type { RentalStatus } from "@/lib/types";

import { Button } from "@/components/ui/button";

interface OrderStatusActionsProps {
  orderId: string;
  status: RentalStatus;
}

export default function OrderStatusActions({
  orderId,
  status,
}: OrderStatusActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleUpdate(
    newStatus: "CONFIRMED" | "CANCELLED" | "PICKED_UP" | "RETURNED",
  ) {
    startTransition(async () => {
      const result = await updateOrderStatusAction(orderId, newStatus);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  if (status === "PLACED") {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={pending}
          onClick={() => handleUpdate("CONFIRMED")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <CheckCircle className="mr-2 size-4" />
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={pending}
          onClick={() => handleUpdate("CANCELLED")}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <XCircle className="mr-2 size-4" />
          Cancel
        </Button>
      </div>
    );
  }

  if (status === "CONFIRMED") {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled={pending}
        onClick={() => handleUpdate("CANCELLED")}
        className="border-red-200 text-red-600 hover:bg-red-50"
      >
        <XCircle className="mr-2 size-4" />
        Cancel
      </Button>
    );
  }

  if (status === "PAID") {
    return (
      <Button
        size="sm"
        disabled={pending}
        onClick={() => handleUpdate("PICKED_UP")}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <PackageCheck className="mr-2 size-4" />
        Mark Picked Up
      </Button>
    );
  }

  if (status === "PICKED_UP") {
    return (
      <Button
        size="sm"
        disabled={pending}
        onClick={() => handleUpdate("RETURNED")}
        className="bg-purple-600 hover:bg-purple-700"
      >
        <RotateCcw className="mr-2 size-4" />
        Mark Returned
      </Button>
    );
  }

  return <span className="text-xs text-muted-foreground">No action</span>;
}
