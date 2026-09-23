import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/index.js";
import ErrorPage from "../pages/ErrorPage/index.js";
import TestPage from "../pages/test/index.js";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/test/:id",
                element: <TestPage/>
            }
        ]
    }
])