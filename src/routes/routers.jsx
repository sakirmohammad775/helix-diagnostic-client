import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/BlogPage/Blog";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";

export const routers = createBrowserRouter([
  {
    // LOGIC: MainLayout wraps everything beneath it
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Default page (e.g., http://localhost:5173/)
        element: <Home />,
      },
      {
        path: "blog", // About page (e.g., http://localhost:5173/about)
        element: <Blog/>
      },
      {
        path: "contact", // Catch-all route for undefined paths (e.g., http://localhost:5173/undefined-path)
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
