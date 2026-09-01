import Image from "next/image";
import { Package } from "lucide-react";

import { getAllGearItems } from "@/lib/api/admin";

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

export default async function AdminGearPage() {
  const gears = await getAllGearItems();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Package className="size-6 text-emerald-600" />
          <h1 className="text-3xl font-bold tracking-tight">Gear Moderation</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          View all gear listed across the platform.
        </p>
      </div>

      {gears.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 size-12 text-slate-300" />
            <h2 className="text-xl font-semibold">No gear found</h2>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gear</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {gears.map((gear) => (
                  <TableRow key={gear.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                          {gear.imageUrl ? (
                            <Image
                              src={gear.imageUrl}
                              alt={gear.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="size-4 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium">{gear.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {gear.category.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {gear.provider?.name ?? "Unknown"}
                    </TableCell>

                    <TableCell className="font-medium text-emerald-600">
                      ৳{gear.pricePerDay}
                    </TableCell>

                    <TableCell>{gear.stock}</TableCell>

                    <TableCell>
                      {gear.isAvailable ? (
                        <Badge className="border-0 bg-emerald-100 text-emerald-700">
                          Available
                        </Badge>
                      ) : (
                        <Badge className="border-0 bg-red-100 text-red-700">
                          Unavailable
                        </Badge>
                      )}
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
