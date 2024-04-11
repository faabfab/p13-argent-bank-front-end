import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import User from "./pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
