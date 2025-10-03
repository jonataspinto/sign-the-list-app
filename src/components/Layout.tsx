import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">List</h1>
          <Navigation />
        </div>
      </header>

      <div className="container mx-auto p-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
