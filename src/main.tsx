import {
  CreateListPage,
  Home,
  ListDetails,
  LoginPage,
  ProfilePage,
} from "@/pages";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { MyLists } from "./pages/MyLists.tsx";
import { SessionProvider } from "./providers/session";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-list",
        element: (
          <ProtectedRoute>
            <CreateListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-lists",
        element: (
          <ProtectedRoute>
            <MyLists />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-lists/:listId",
        element: (
          <ProtectedRoute>
            <ListDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <Toaster />
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>
);
