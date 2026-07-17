import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/BlogPage/Blog";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";

export const routers = createBrowserRouter([
  {
    // LOGIC: MainLayout wraps everything beneath it
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/", // Default page (e.g., http://localhost:5173/)
        Component: Home,
      },
      {
        path: "/blog", // About page (e.g., http://localhost:5173/about)
        Component: Blog,
      },
      {
        path: "contact", // Catch-all route for undefined paths (e.g., http://localhost:5173/undefined-path)
        Component: Contact,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component:Login
      }
    ],
  },
]);
