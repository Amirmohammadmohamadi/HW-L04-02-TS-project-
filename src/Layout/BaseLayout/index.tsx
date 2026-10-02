import styles from "./layout.module.scss";
import type { ReactNode } from "react";

interface propsType {
    children:ReactNode;
}

const BaseLayout = ({children}:propsType)=> {
    return <div className={styles.layoutContainer}>
        {children}
    </div>
}

export default BaseLayout;