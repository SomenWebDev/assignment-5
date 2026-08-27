"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

import { updateGearAction } from "@/lib/actions/gearActions";
import type { ICategory, IGear } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditGearFormProps {
  gear: IGear;
  categories: ICategory[];
}

interface GearFormState {
  success: boolean;
  message: string;
}

const initialState: GearFormState = {
  success: false,
  message: "",
};

export default function EditGearForm({ gear, categories }: EditGearFormProps) {
  const updateAction = updateGearAction.bind(null, gear.id);

  const [state, formAction, pending] = useActionState(
    updateAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/provider/gear"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to My Gear
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Gear</h1>

          <p className="mt-1 text-muted-foreground">
            Update the details of your rental equipment.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Gear Information</CardTitle>

          <CardDescription>
            Update the information for{" "}
            <span className="font-medium text-foreground">{gear.name}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Gear Name</Label>

              <Input
                id="name"
                name="name"
                defaultValue={gear.name}
                placeholder="e.g. Portable Camping Stove"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                name="description"
                defaultValue={gear.description ?? ""}
                placeholder="Describe your gear..."
                rows={4}
              />
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>

              <Input
                id="brand"
                name="brand"
                defaultValue={gear.brand ?? ""}
                placeholder="e.g. Coleman"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>

              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={gear.imageUrl ?? ""}
                placeholder="https://example.com/image.jpg"
              />

              <p className="text-xs text-muted-foreground">
                Provide a publicly accessible image URL.
              </p>
            </div>

            {/* Price + Stock */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Price Per Day</Label>

                <Input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={String(gear.pricePerDay)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>

                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={gear.stock}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>

              <Select name="categoryId" defaultValue={gear.categoryId} required>
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="isAvailable">Availability</Label>

              <Select
                name="isAvailable"
                defaultValue={gear.isAvailable ? "true" : "false"}
              >
                <SelectTrigger id="isAvailable">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>

                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error */}
            {state.message && !state.success && (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {state.message}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/provider/gear"
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={pending}
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
              >
                <Save className="mr-2 size-4" />

                {pending ? "Updating Gear..." : "Update Gear"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
