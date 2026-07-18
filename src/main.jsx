import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routers } from "./routes/routers.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* LOGIC: RouterProvider injects the entire routing configuration into the app */}
      <RouterProvider router={routers}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
