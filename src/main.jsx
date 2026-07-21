import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routers } from "./routes/routers.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* LOGIC: RouterProvider injects the entire routing configuration into the app */}
        <RouterProvider router={routers}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
