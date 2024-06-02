import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: (
        <Dashboard />
    ),
  }
]);
export default router;