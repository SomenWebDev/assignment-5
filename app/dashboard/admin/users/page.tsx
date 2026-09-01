import { Users } from "lucide-react";

import { getAllUsers } from "@/lib/api/admin";

import UsersTable from "@/components/dashboard/admin/UsersTable";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Users className="size-6 text-emerald-600" />
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          View and manage all platform users.
        </p>
      </div>

      {users.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="mb-4 size-12 text-slate-300" />
            <h2 className="text-xl font-semibold">No users found</h2>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <UsersTable users={users} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
