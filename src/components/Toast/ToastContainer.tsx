import { useToast } from "../../hooks/useToast.js"
import Toast from "./toast.js";
import styles from "./toastContainer.module.scss";

const ToastContainer = () => {
    const { toasts , dismissToast:onDismiss } = useToast();

    if(!toasts.length) return null;
    return <div className={styles.toastContainer}>
        {
            toasts.map(toast => 
                <Toast 
                    type={toast.type} 
                    key={toast.id} 
                    message={toast.message}
                    onDismiss={() => onDismiss(toast.id)}
                />
            )
        }
    </div>
};

export default ToastContainer;