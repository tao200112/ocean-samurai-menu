import { Outlet } from "react-router-dom";
import { TopNav, BottomNav, SiteFooter } from "./Navigation";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <TopNav />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
