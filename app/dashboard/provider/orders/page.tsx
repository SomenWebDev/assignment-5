import Image from "next/image";
import { CalendarDays, ClipboardList, Package, User } from "lucide-react";

import { getIncomingOrders } from "@/lib/api/rental";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import OrderStatusActions from "@/components/dashboard/provider/OrderStatusActions";

const statusStyles: Record<string, string> = {
  PLACED: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-emerald-100 text-emerald-700",
  PICKED_UP: "bg-purple-100 text-purple-700",
  RETURNED: "bg-slate-200 text-slate-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function getDaysBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

export default async function ProviderOrdersPage() {
  const orders = await getIncomingOrders();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <ClipboardList className="size-6 text-emerald-600" />
          <h1 className="text-3xl font-bold tracking-tight">Incoming Orders</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Manage rental orders for the gear you provide.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
              <ClipboardList className="size-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold">No orders yet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Orders placed for your gear will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const days = getDaysBetween(order.startDate, order.endDate);

            return (
              <Card key={order.id} className="border-0 shadow-sm">
                <CardContent className="space-y-4 p-5">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      {new Date(order.startDate).toLocaleDateString()} –{" "}
                      {new Date(order.endDate).toLocaleDateString()} ({days}{" "}
                      {days === 1 ? "day" : "days"})
                    </div>

                    <Badge
                      className={`border-0 ${statusStyles[order.status] ?? "bg-slate-100 text-slate-700"}`}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  {/* Customer */}
                  {order.customer && (
                    <div className="flex items-center gap-2 border-t pt-3 text-sm">
                      <User className="size-4 text-muted-foreground" />
                      <span className="font-medium">{order.customer.name}</span>
                      <span className="text-muted-foreground">
                        {order.customer.email}
                      </span>
                    </div>
                  )}

                  {/* Items */}
                  <div className="space-y-3 border-t pt-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-slate-100">
                          {item.gearItem.imageUrl ? (
                            <Image
                              src={item.gearItem.imageUrl}
                              alt={item.gearItem.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="size-6 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">
                            {item.gearItem.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} · Line total: ৳{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Order #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        ৳{order.totalAmount}
                      </p>
                    </div>

                    <OrderStatusActions
                      orderId={order.id}
                      status={order.status}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
