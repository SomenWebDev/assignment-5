"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";

import {
  createReviewAction,
  checkReviewedAction,
  type ReviewFormState,
} from "@/lib/actions/reviewActions";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReviewDialogProps {
  gearItemId: string;
  gearName: string;
}

const initialState: ReviewFormState = {
  success: false,
  message: "",
};

export default function ReviewDialog({
  gearItemId,
  gearName,
}: ReviewDialogProps) {
  const action = createReviewAction.bind(null, gearItemId);
  const [state, formAction, pending] = useActionState(action, initialState);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewed, setReviewed] = useState<boolean | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    checkReviewedAction(gearItemId).then((result) => {
      if (cancelled) return;

      startTransition(() => {
        setReviewed(result);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [gearItemId]);

  useEffect(() => {
    if (!state.message) return;

    startTransition(() => {
      if (state.success) {
        toast.success(state.message);
        setReviewed(true);
        setOpen(false);
      } else {
        toast.error(state.message);
        if (state.message.toLowerCase().includes("already reviewed")) {
          setReviewed(true);
          setOpen(false);
        }
      }
    });
  }, [state]);

  if (reviewed === null) {
    return null;
  }

  if (reviewed) {
    return (
      <span className="text-xs font-medium text-emerald-600">
        Review submitted
      </span>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" variant="outline">
          Leave a Review
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Review {gearName}</DialogTitle>
            <DialogDescription>
              Share your experience with this gear to help other renters.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`size-7 transition-colors ${
                      star <= (hovered || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <input type="hidden" name="rating" value={rating} />
            </div>

            <Textarea
              name="comment"
              placeholder="What did you think of this gear? (optional)"
              rows={4}
            />

            {state.message && !state.success && (
              <p className="text-sm text-red-600">{state.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending || rating === 0}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
