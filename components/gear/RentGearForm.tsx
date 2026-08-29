"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Star } from "lucide-react";

import {
  createRentalAction,
  type RentalFormState,
} from "@/lib/actions/rentalActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RentGearFormProps {
  gearId: string;
  pricePerDay: string;
  stock: number;
  isAvailable: boolean;
}

const initialState: RentalFormState = {
  success: false,
  message: "",
};

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function RentGearForm({
  gearId,
  pricePerDay,
  stock,
  isAvailable,
}: RentGearFormProps) {
  const router = useRouter();
  const action = createRentalAction.bind(null, gearId);

  const [state, formAction, pending] = useActionState(action, initialState);

  const today = toDateInputValue(new Date());
  const tomorrow = toDateInputValue(addDays(new Date(), 1));

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [quantity, setQuantity] = useState("1");

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const estimatedTotal = days * Number(pricePerDay) * (Number(quantity) || 1);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      if (state.order) {
        router.push(`/dashboard/customer`);
      }
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  const canRent = isAvailable && stock > 0;

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-5">
      <div className="flex items-center gap-2 font-semibold">
        <CalendarDays className="size-4 text-emerald-600" />
        Select Rental Dates
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => {
              const newStart = e.target.value;
              setStartDate(newStart);

              if (newStart >= endDate) {
                setEndDate(toDateInputValue(addDays(new Date(newStart), 1)));
              }
            }}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            min={toDateInputValue(addDays(new Date(startDate), 1))}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">{stock} available</p>
      </div>

      <div className="flex items-center justify-between rounded-md bg-emerald-50 p-3 text-sm">
        <span className="text-emerald-700">
          {days} {days === 1 ? "day" : "days"} × ৳{pricePerDay} ×{" "}
          {quantity || 1}
        </span>
        <span className="font-bold text-emerald-700">
          ৳{estimatedTotal.toFixed(2)}
        </span>
      </div>

      {state.message && !state.success && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!canRent || pending}
        className="w-full bg-emerald-600 hover:bg-emerald-700"
      >
        <Star className="mr-2 size-4" />
        {pending
          ? "Placing Order..."
          : canRent
            ? "Rent Now"
            : "Currently Unavailable"}
      </Button>
    </form>
  );
}
