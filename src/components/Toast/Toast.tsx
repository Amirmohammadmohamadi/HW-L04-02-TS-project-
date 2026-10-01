import type { ToastType } from "../../types/index.js";
import styles from "./toast.module.scss";
import { CiMedicalCross } from "react-icons/ci";

export interface ToastPropsType {
    type: ToastType;
    message: string;
    onDismiss: React.MouseEventHandler
}

const Toast = ({message,type,onDismiss}:ToastPropsType) => {

    return <div className={`${styles.toastCard} ${styles[type]}`}>
        <CiMedicalCross 
            className={styles.crossIcon}
            fill="white" 
            size={15} 
            onClick={onDismiss}
        />
        <p className={styles.message}>{message}</p>
    </div>
};

export default Toast;