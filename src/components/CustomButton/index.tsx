import styles from "./customButton.module.scss";

type ButtonPropType = {
    title: string;
    variant: string;
}

const CustomButton = ({title,variant}:ButtonPropType)=> {
    return <button className={styles[variant]}>{title}</button>
};

export default CustomButton;