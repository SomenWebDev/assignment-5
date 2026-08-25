import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Unable to load user information.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

      <p className="mt-2 text-muted-foreground">Email: {user.email}</p>

      <p className="mt-2">
        Role: <strong>{user.role}</strong>
      </p>
    </main>
  );
}
