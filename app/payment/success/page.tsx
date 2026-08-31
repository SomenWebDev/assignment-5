import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4">
      <Card className="w-full border-0 shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="size-8 text-emerald-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="mt-2 text-muted-foreground">
              Your rental order has been paid. The provider will prepare your
              gear for pickup.
            </p>
          </div>

          <Link href="/dashboard/customer/orders">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              View My Orders
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
