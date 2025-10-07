import { Outlet } from "react-router-dom";
import { Navbar01 } from "./ui/shadcn-io/navbar-01";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar01 />

      <div className="container mx-auto p-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
