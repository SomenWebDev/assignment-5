"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { IAdminUser } from "@/lib/types";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserStatusButton from "@/components/dashboard/admin/UserStatusButton";

interface UsersTableProps {
  users: IAdminUser[];
}

const roleStyles: Record<string, string> = {
  CUSTOMER: "bg-blue-100 text-blue-700",
  PROVIDER: "bg-purple-100 text-purple-700",
  ADMIN: "bg-slate-200 text-slate-700",
};

export default function UsersTable({ users }: UsersTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;

    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query),
    );
  }, [users, search]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        of <span className="font-semibold text-foreground">{users.length}</span>{" "}
        users
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge
                  className={`border-0 ${roleStyles[user.role] ?? "bg-slate-100 text-slate-700"}`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`border-0 ${
                    user.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {user.role !== "ADMIN" && (
                  <UserStatusButton userId={user.id} status={user.status} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
