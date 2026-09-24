import CustomButton from "../CustomButton/index.js";
import NavBar from "../NavBar/index.js";
import styles from "./header.module.scss";
import { SiTask } from "react-icons/si";

const Header = () => {
    return <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
            <SiTask className={styles.logo} size={20}/>
            <h3>TEAM TASK MANAGER</h3>
        </div>
        <NavBar/>
        <CustomButton title="Register" variant="primary"/>
    </div>
};

export default Header;