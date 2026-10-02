import { useAuth } from "../../hooks/useAuth.js";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import BaseLayout from "../BaseLayout/index.js";
import Header from "../../components/Header/index.js";
import NavBar from "../../components/NavBar/index.js";

const ProtectedRoute = () => {
    const {isAuthenticated,isLoading} = useAuth();
    const location = useLocation();

    if(isLoading) {
        return <div>loading...</div>
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{from:location}} replace/>;
    }

    return <BaseLayout>
        <Header ><NavBar/></Header>
        <Outlet/>
    </BaseLayout>
};

export default ProtectedRoute;