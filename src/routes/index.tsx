import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";

const router = createBrowserRouter([
  { path: "/", element: <Signin /> },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
]);
export default router;