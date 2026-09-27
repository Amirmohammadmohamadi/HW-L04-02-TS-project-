import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Header from "../../components/Header/index.js";
import type { ReactNode } from "react";

const BaseLayout = ({children}:{children?:ReactNode})=> {
    return <div className={styles.layoutContainer}>
        <Outlet/>
        {/* <Header/> */}
        {children}
    </div>
}

export default BaseLayout;