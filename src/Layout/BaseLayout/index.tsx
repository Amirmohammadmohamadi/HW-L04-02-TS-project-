import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

const BaseLayout = ()=> {
    return <div className={styles.layoutContainer}>
        <Outlet/>
    </div>
}

export default BaseLayout;