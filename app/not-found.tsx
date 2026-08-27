import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg border-0 text-center shadow-sm">
        <CardHeader className="items-center space-y-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <SearchX className="size-8" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl">404 - Page Not Found</CardTitle>

            <CardDescription className="text-base">
              Sorry, the page you are looking for does not exist.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
