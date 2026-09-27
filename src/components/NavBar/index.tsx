import { NavLink } from "react-router-dom";
import styles from "./navBar.module.scss"

const NavBar = ()=> {
    return <div className={styles.navBarContainer}>
        <NavLink to="./test/1" className={({isActive})=>isActive ? [styles.link,styles.isActive].join(" ") : [styles.link,styles.isNotActive].join(" ")}>Dashbord</NavLink>
        <NavLink to="./test/2" className={({isActive})=>isActive ? [styles.link,styles.isActive].join(" ") : [styles.link,styles.isNotActive].join(" ")} >Home</NavLink>
        <NavLink to="./test/3" className={({isActive})=>isActive ? [styles.link,styles.isActive].join(" ") : [styles.link,styles.isNotActive].join(" ")}>Home</NavLink>
        <NavLink to="./test/4" className={({isActive})=>isActive ? [styles.link,styles.isActive].join(" ") : [styles.link,styles.isNotActive].join(" ")}>Login</NavLink>
    </div>
};

export default NavBar;
