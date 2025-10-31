import {
  AddItemPage,
  CreateListPage,
  EditListPage,
  Home,
  ListDetails,
  LoginPage,
  ProfilePage,
  ViewListByCode,
} from "@/pages";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

import { ForgotPasswordPage } from "./pages/Auth/ForgotPasswordPage/index.tsx";
import { SignupPage } from "./pages/Auth/Signup/index.tsx";
import { MyLists } from "./pages/MyLists/index.tsx";
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
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
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
      {
        path: "my-lists/:listId/add-item",
        element: (
          <ProtectedRoute>
            <AddItemPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-lists/:listId/edit",
        element: (
          <ProtectedRoute>
            <EditListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "view-list",
        element: <ViewListByCode />,
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
