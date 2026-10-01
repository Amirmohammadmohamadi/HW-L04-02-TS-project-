import type { ReactNode } from "react";
import styles from "./customButton.module.scss";
import type React from "react";

type ButtonPropType = {
    title: string;
    variant: string;
    children?: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: React.MouseEventHandler;
}

const CustomButton = ({title,variant,children,type,onClick}:ButtonPropType)=> {
    return <button 
                className={styles[variant]} 
                type={type}
                onClick={onClick}
                >
                    {title}{children}
            </button>
};

export default CustomButton;