import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/index.js";
import LoginPage from "../pages/LoginPage/index.js";
import AuthLayout from "../Layout/AuthLayout/index.js";
import ProtectedRoute from "../Layout/ProtectedRoute/index.js";
import DashbordPage from "../pages/DashbordPage/index.js";
import ProjectsPage from "../pages/ProjectsPage/index.js";
import ProjectDetailPage from "../pages/ProjectDetailPage/index.js";
import UsersPage from "../pages/UsersPage/index.js";
import ProfilePage from "../pages/ProfilePage/index.js";
import NotFoundPag from "../pages/NotFoundPage/index.js";
import RegisterPage from "../pages/RegisterPage/index.js";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>}
        ]
    },
    {
        // path:"/",
        element: <ProtectedRoute/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true, //or path: "",
                element: <DashbordPage/>
            },
            {
                path:"projects",
                element: <ProjectsPage/>
            },
            {
                path:"project_detail/:id",
                element: <ProjectDetailPage/>
            },
            {
                path: "users",
                element: <UsersPage/>,
            },
            {
                path: "profile",
                element: <ProfilePage/>
            }

        ],
    },
    {
        path: "*",
        element: <NotFoundPag/>,
    }
])