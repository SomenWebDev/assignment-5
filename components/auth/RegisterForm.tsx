"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { User, Mail, Lock, UserRoundPlus } from "lucide-react";

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
    <Card className="w-full max-w-md border-0 bg-white/95 shadow-xl shadow-emerald-950/10">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <UserRoundPlus className="size-7" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Create your account
          </CardTitle>

          <CardDescription className="mt-2 text-slate-500">
            Join GearUp and start renting sports gear
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-slate-700">
              Name
            </Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="h-11 border-slate-200 pl-10 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-slate-700">
              Email
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 border-slate-200 pl-10 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-slate-700">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11 border-slate-200 pl-10 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="font-medium text-slate-700">
              Account Type
            </Label>

            <Select name="role" required>
              <SelectTrigger
                id="role"
                className="h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>

                <SelectItem value="PROVIDER">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={pending}
            className="h-11 w-full bg-emerald-600 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            {pending ? "Creating account..." : "Create account"}
          </Button>

          {/* Login */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
