"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="size-8 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error.message || "We couldn't load your payment history."}
          </p>
        </div>
        <Button onClick={reset} className="bg-emerald-600 hover:bg-emerald-700">
          <RotateCcw className="mr-2 size-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
