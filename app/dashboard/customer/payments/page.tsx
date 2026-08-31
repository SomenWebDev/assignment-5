import { CreditCard, Package } from "lucide-react";

import { getMyPayments } from "@/lib/api/payment";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const paymentStatusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
};

export default async function CustomerPaymentsPage() {
  const payments = await getMyPayments();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="size-6 text-emerald-600" />
          <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          A record of all your rental payments.
        </p>
      </div>

      {payments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
              <CreditCard className="size-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold">No payments yet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Payments for your rental orders will show up here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Gear</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      #{payment.rentalOrderId.slice(0, 8)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="size-4 text-muted-foreground" />
                        <span className="truncate">
                          {payment.rentalOrder.items
                            .map((item) => item.gearItem.name)
                            .join(", ")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold text-emerald-600">
                      ৳{payment.amount}
                    </TableCell>

                    <TableCell>{payment.method}</TableCell>

                    <TableCell>
                      <Badge
                        className={`border-0 ${
                          paymentStatusStyles[payment.status] ??
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
