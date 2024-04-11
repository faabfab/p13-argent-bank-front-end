import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from 'react-router'

import Layout from "./layouts/Layout";
import Home from "./pages/Home"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
        ],
    },
])

export const Router = () => <RouterProvider router={router} />

