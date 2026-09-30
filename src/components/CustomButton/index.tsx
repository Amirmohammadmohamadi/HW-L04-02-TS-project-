import type { ReactNode } from "react";
import styles from "./customButton.module.scss";

type ButtonPropType = {
    title: string;
    variant: string;
    children?: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
}

const CustomButton = ({title,variant,children,type}:ButtonPropType)=> {
    return <button className={styles[variant]} type={type}>{title}{children}</button>
};

export default CustomButton;