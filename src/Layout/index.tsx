import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Header from "../components/Header/index.js";

const Layout = ()=> {
    return <div className={styles.layoutContainer}>
        <Outlet/>
        <Header/>
    </div>
}

export default Layout;