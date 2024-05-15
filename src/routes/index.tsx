import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";

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