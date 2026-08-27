"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GearErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GearError({ error, reset }: GearErrorProps) {
  console.error("Provider Gear Error:", error);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg border-0 text-center shadow-sm">
        <CardHeader className="items-center space-y-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="size-7" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl">Something went wrong</CardTitle>

            <CardDescription className="text-base">
              We couldn&apos;t load your gear right now. Please try again.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>

          <Link href="/dashboard/provider">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 size-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
