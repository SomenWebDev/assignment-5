import { CustomerSidebar } from "@/components/dashboard/customer/CustomerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CustomerSidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
