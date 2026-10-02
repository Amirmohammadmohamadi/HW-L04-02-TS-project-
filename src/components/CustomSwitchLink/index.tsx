import { Link } from "react-router-dom";
import styles from "./customSwitchLind.module.scss";
import type { ReactNode } from "react";

interface propsType {
    link:string;
    linkText:string;
    children:ReactNode;
}

const CustomSwitchLink = ({ link , linkText , children }:propsType) => {
    return <p> 
                {children}
                <Link to={link}>{linkText}</Link>
            </p>
};

export default CustomSwitchLink;