"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import { registerAction } from "@/lib/actions/authActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );
  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>

        <CardDescription>
          Join GearUp and start renting sports gear
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Account Type</Label>

            <Select name="role" required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>

                <SelectItem value="PROVIDER">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {state.message && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
