import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/BlogPage/Blog";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpcomingAppointments from "../pages/Dashboard/DashboardHome/UpcomingAppointments";
import TestResults from "../pages/Dashboard/DashboardHome/TestResults";

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
      },
      {
        path:'profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ],
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'profile',
        element:<Profile></Profile>
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "appointments",
        element: <UpcomingAppointments />,
      },
      {
        path: "results",
        element: <TestResults />,
      },

    ]
  }
]);
