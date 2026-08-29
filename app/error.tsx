"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-lg border-0 text-center shadow-sm">
        <CardHeader className="items-center space-y-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="size-8" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl">Something went wrong</CardTitle>

            <CardDescription className="text-base">
              An unexpected error occurred. Please try again.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
