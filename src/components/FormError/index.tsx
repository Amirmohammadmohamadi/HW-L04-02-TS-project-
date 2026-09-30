import styles from "./formError.module.scss";

interface ErrorPropType {
    error:string;
}

const FormError = ({ error }:ErrorPropType)=> {
    if(error) return <p className={styles.errorText}>{error}</p>
    else return null;
};

export default FormError;