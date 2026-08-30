"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Star } from "lucide-react";

import {
  createRentalAction,
  type RentalFormState,
} from "@/lib/actions/rentalActions";
import { checkGearAvailability } from "@/lib/actions/gearActions";

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

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
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

  const [startDate, setStartDate] = useState(today);

  const [endDate, setEndDate] = useState(
    toDateInputValue(addDays(new Date(), 1)),
  );

  const [quantity, setQuantity] = useState("1");

  const [availableStock, setAvailableStock] = useState(stock);

  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const [availabilityError, setAvailabilityError] = useState("");

  const minimumEndDate = startDate
    ? toDateInputValue(addDays(parseDate(startDate), 1))
    : today;

  const enteredQuantity = Number(quantity) || 1;

  const numericQuantity =
    availableStock > 0
      ? Math.min(Math.max(1, enteredQuantity), availableStock)
      : 1;

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (parseDate(endDate).getTime() - parseDate(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const estimatedTotal = days * Number(pricePerDay) * numericQuantity;

  /*
   * Check availability whenever dates change.
   * Uses a Server Action (not a direct browser fetch) so this never
   * hits CORS — the Next.js server talks to the backend, not the browser.
   */
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    if (endDate <= startDate) {
      return;
    }

    let cancelled = false;

    async function checkAvailability() {
      setIsCheckingAvailability(true);
      setAvailabilityError("");

      const result = await checkGearAvailability(gearId, startDate, endDate);

      if (cancelled) return;

      if (!result.success) {
        setAvailableStock(0);
        setAvailabilityError(result.message);
        setIsCheckingAvailability(false);
        return;
      }

      const serverAvailableStock = result.availableStock ?? 0;

      const safeAvailableStock = Number.isFinite(serverAvailableStock)
        ? Math.max(0, Math.min(serverAvailableStock, stock))
        : 0;

      setAvailableStock(safeAvailableStock);
      setIsCheckingAvailability(false);
    }

    const timeout = setTimeout(() => {
      checkAvailability();
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [gearId, startDate, endDate, stock]);

  /*
   * Server Action response
   */

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success(state.message);

      if (state.order) {
        router.push("/dashboard/customer");
      }

      return;
    }

    toast.error(state.message);
  }, [state, router]);

  function handleStartDateChange(value: string) {
    setStartDate(value);

    if (!endDate || value >= endDate) {
      const nextDay = addDays(parseDate(value), 1);

      setEndDate(toDateInputValue(nextDay));
    }
  }

  function handleEndDateChange(value: string) {
    if (value < minimumEndDate) {
      setEndDate(minimumEndDate);

      return;
    }

    setEndDate(value);
  }

  function handleQuantityChange(value: string) {
    if (value === "") {
      setQuantity("");

      return;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue) || !Number.isFinite(numericValue)) {
      return;
    }

    if (numericValue < 1) {
      setQuantity("1");

      return;
    }

    if (availableStock > 0 && numericValue > availableStock) {
      setQuantity(String(availableStock));

      return;
    }

    setQuantity(value);
  }

  const canRent =
    isAvailable &&
    availableStock > 0 &&
    !isCheckingAvailability &&
    !availabilityError;

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl border bg-card p-5 shadow-sm"
    >
      {/* Header */}

      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100">
          <CalendarDays className="size-4 text-emerald-600" />
        </div>

        <div>
          <h2 className="font-semibold">Rent This Gear</h2>

          <p className="text-xs text-muted-foreground">
            Select your rental dates and quantity.
          </p>
        </div>
      </div>

      {/* Dates */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Start Date */}

        <div className="space-y-1.5">
          <Label htmlFor="startDate">Start Date</Label>

          <Input
            id="startDate"
            name="startDate"
            type="date"
            min={today}
            value={startDate}
            onChange={(event) => handleStartDateChange(event.target.value)}
            required
          />
        </div>

        {/* End Date */}

        <div className="space-y-1.5">
          <Label htmlFor="endDate">End Date</Label>

          <Input
            id="endDate"
            name="endDate"
            type="date"
            min={minimumEndDate}
            value={endDate}
            onChange={(event) => handleEndDateChange(event.target.value)}
            required
          />
        </div>
      </div>

      {/* Availability */}

      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium">
            Available for selected dates
          </span>

          {isCheckingAvailability ? (
            <span className="text-sm text-muted-foreground">Checking...</span>
          ) : availabilityError ? (
            <span className="text-sm font-medium text-red-600">
              Unable to check
            </span>
          ) : (
            <span
              className={
                availableStock > 0
                  ? "font-semibold text-emerald-600"
                  : "font-semibold text-red-600"
              }
            >
              {availableStock} {availableStock === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {availabilityError && (
          <p className="mt-3 text-sm text-red-600">{availabilityError}</p>
        )}

        {!isCheckingAvailability &&
          !availabilityError &&
          availableStock <= 0 && (
            <p className="mt-2 text-xs text-red-600">
              This gear is fully booked for the selected dates.
            </p>
          )}

        {!isCheckingAvailability &&
          !availabilityError &&
          enteredQuantity > availableStock &&
          availableStock > 0 && (
            <p className="mt-2 text-xs text-amber-600">
              Only {availableStock}{" "}
              {availableStock === 1 ? "item is" : "items are"} available for the
              selected dates.
            </p>
          )}
      </div>

      {/* Quantity */}

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>

        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          max={Math.max(1, availableStock)}
          value={quantity}
          onChange={(event) => handleQuantityChange(event.target.value)}
          disabled={
            isCheckingAvailability ||
            availableStock <= 0 ||
            Boolean(availabilityError)
          }
          required
        />

        <p className="text-xs text-muted-foreground">
          {isCheckingAvailability
            ? "Checking availability..."
            : availabilityError
              ? "Availability could not be verified."
              : `${availableStock} ${
                  availableStock === 1 ? "item" : "items"
                } available for selected dates`}
        </p>
      </div>

      {/* Estimated Total */}

      <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Estimated Total
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="space-y-1 text-sm text-emerald-700">
            <p>
              {days} {days === 1 ? "day" : "days"}
            </p>

            <p>
              ৳{pricePerDay} / day × {numericQuantity}{" "}
              {numericQuantity === 1 ? "item" : "items"}
            </p>
          </div>

          <p className="text-xl font-bold text-emerald-700">
            ৳{estimatedTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Server Action Error */}

      {state.message && !state.success && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {state.message}
        </p>
      )}

      {/* Submit */}

      <Button
        type="submit"
        size="lg"
        disabled={
          !canRent ||
          pending ||
          isCheckingAvailability ||
          Boolean(availabilityError) ||
          numericQuantity > availableStock
        }
        className="w-full bg-emerald-600 hover:bg-emerald-700"
      >
        <Star className="mr-2 size-4" />

        {pending
          ? "Placing Order..."
          : isCheckingAvailability
            ? "Checking Availability..."
            : availabilityError
              ? "Availability Check Failed"
              : availableStock <= 0
                ? "Unavailable for Selected Dates"
                : canRent
                  ? "Rent Now"
                  : "Currently Unavailable"}
      </Button>
    </form>
  );
}
