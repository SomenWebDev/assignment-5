import { AuthSuccessToast } from "@/components/auth/AuthSuccessToast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthSuccessToast />
      {children}
    </>
  );
}
