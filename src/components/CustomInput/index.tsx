import type React from "react";
import styles from "./customInput.module.scss";
import FormError from "../FormError/index.js";

interface CustomInputType {
    type:string;
    placeholder?:string;
    value:string;
    onChange: (input:React.InputHTMLAttributes<HTMLInputElement>)=> void;
    error:string;
}

const CustomInput = ({type,placeholder,value,onChange,error}:CustomInputType)=> {
    return <div className={styles.inputContainer}>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        <FormError error={error}/>
    </div>
};

export default CustomInput;