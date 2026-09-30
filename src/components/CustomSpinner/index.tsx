import { ImSpinner } from "react-icons/im"
import styles from "./customSpinner.module.scss";

interface CustomSpinnerType {
    size: string;
};

const CustomSpinner = ({size}:CustomSpinnerType) => {
    return <ImSpinner className={styles.spinnerIcon} size={size}/>
};

export default CustomSpinner;