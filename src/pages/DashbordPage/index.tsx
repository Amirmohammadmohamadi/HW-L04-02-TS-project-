import CustomButton from "../../components/CustomButton/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./dashbord.module.scss";

const DashbordPage = () => {
    const { logout } = useAuth();

    return <div>
        <h1>Dashbord</h1>
        <CustomButton title="sign out" variant="primary" onClick={logout}/>    
    </div>
};

export default DashbordPage;