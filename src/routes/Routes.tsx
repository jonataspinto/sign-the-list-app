import {
  AddItemPage,
  CreateListPage,
  EditListPage,
  ForgotPasswordPage,
  Home,
  ListDetails,
  LoginPage,
  MyLists,
  ProfilePage,
  SignupPage,
  ViewListByCode,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/Layout";

import { ProtectedRoute } from "./ProtectedRoute";

export const browserRouter = createBrowserRouter([
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
