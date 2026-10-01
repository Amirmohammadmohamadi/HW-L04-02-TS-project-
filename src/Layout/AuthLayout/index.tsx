import { useAuth } from "../../hooks/useAuth.js";
import BaseLayout from "../BaseLayout/index.js"
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
    const { isLoading , isAuthenticated } = useAuth();

    if(!isLoading && isAuthenticated) {
        return <Navigate to="/" replace/>
    }
    return <BaseLayout></BaseLayout>
};

export default AuthLayout;