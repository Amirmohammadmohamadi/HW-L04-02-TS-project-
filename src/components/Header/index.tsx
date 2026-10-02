import type { ReactNode } from "react";
import CustomButton from "../CustomButton/index.js";
import styles from "./header.module.scss";
import { SiTask } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth.js";

interface PropsType {
    children?:ReactNode | null;
}

const Header = ({children}:PropsType) => {
    const { logout} = useAuth();

    return <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
            <SiTask className={styles.logo} size={20}/>
            <h3>TEAM TASK MANAGER</h3>
        </div>
        {children}
        <CustomButton title="logout" variant="primary" onClick={logout}/>
    </div>
};

export default Header;