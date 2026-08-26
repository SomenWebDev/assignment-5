import { logoutAction } from "@/lib/actions/authActions";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="destructive">
        Logout
      </Button>
    </form>
  );
}
