import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4">
      <Card className="w-full border-0 shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="size-8 text-red-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Payment Cancelled</h1>
            <p className="mt-2 text-muted-foreground">
              Your payment was not completed. You can try again from your
              orders.
            </p>
          </div>

          <Link href="/dashboard/customer/orders">
            <Button variant="outline">Back to My Orders</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
