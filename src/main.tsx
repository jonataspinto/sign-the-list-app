import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

import { SessionProvider } from "./providers/session";
import { browserRouter } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <Toaster />
      <RouterProvider router={browserRouter} />
    </SessionProvider>
  </StrictMode>
);
