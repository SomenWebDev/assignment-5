"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import { createPaymentAction } from "@/lib/actions/paymentActions";

import { Button } from "@/components/ui/button";

interface PayNowButtonProps {
  rentalOrderId: string;
}

export default function PayNowButton({ rentalOrderId }: PayNowButtonProps) {
  const [pending, startTransition] = useTransition();

  function handlePay() {
    startTransition(async () => {
      const result = await createPaymentAction(rentalOrderId);

      if (!result.success || !result.checkoutUrl) {
        toast.error(result.message);
        return;
      }

      window.location.href = result.checkoutUrl;
    });
  }

  return (
    <Button
      size="sm"
      disabled={pending}
      onClick={handlePay}
      className="bg-emerald-600 hover:bg-emerald-700"
    >
      <CreditCard className="mr-2 size-4" />
      {pending ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
