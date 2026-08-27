"use client";

import { useState, useTransition } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { deleteGearAction } from "@/lib/actions/gearActions";

import { Button } from "@/components/ui/button";

interface DeleteGearButtonProps {
  gearId: string;
  gearName: string;
}

export default function DeleteGearButton({
  gearId,
  gearName,
}: DeleteGearButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteGearAction(gearId);

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      {/* Delete Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        disabled={pending}
        className="hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="size-4" />
      </Button>

      {/* Custom Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !pending && setOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Close */}
            <button
              type="button"
              onClick={() => !pending && setOpen(false)}
              disabled={pending}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              <X className="size-5" />
            </button>

            {/* Icon */}
            <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="size-6 text-red-600" />
            </div>

            {/* Content */}
            <div className="pr-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Delete this gear?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">{gearName}</span>?
              </p>

              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-7 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="mr-2 size-4" />
                {pending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
