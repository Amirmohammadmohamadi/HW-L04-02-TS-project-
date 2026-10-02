import { useForm , Controller } from "react-hook-form";
import styles from "./loginPage.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth.js";
import type { User } from "../../types/index.js";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/index.js";
import CustomButton from "../../components/CustomButton/index.js";
import CustomSpinner from "../../components/CustomSpinner/index.js";
import { useToast } from "../../hooks/useToast.js";
import ToastContainer from "../../components/Toast/ToastContainer.js";
import CustomSwitchLink from "../../components/CustomSwitchLink/index.js";

const loginSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(4),
});
const LoginPage = () => {
    const { control , formState:{errors,isSubmitting} , handleSubmit , reset } = 
    useForm({resolver:yupResolver(loginSchema)});
    console.log("form errors:",errors);
    const { login  } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async(data:Pick<User,"email" | "password">):Promise<void> => {
        const res = await login(data.email,data.password);
        if(!res.success) {
            toast.error(res.error);
            return;
        }
        reset({email:"",password:""});
        toast.success("you loged in successfully")
        navigate("/");
    };
    
    return <div className={styles.loginPageContainer}>
        <ToastContainer />
        <div className={styles.loginCard}>
            <h2>Login page</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="email"
                    control={control}
                    render={({field})=> 
                        <CustomInput 
                            type="text"
                            placeholder="email" 
                            error={errors.email?.message ?? ""}
                            {...field}
                        />
                    }
                />
                <Controller 
                    name="password"
                    control={control}
                    render={({field})=>
                        <CustomInput 
                            type="password"
                            placeholder="password"
                            error={errors.password?.message ?? ""}
                            {...field}
                        />
                    }
                />
                
                <CustomButton title="" variant="primary">
                    {isSubmitting ? <CustomSpinner size="25"/> : "Submit"}
                </CustomButton>
                <CustomSwitchLink link="/register" linkText="register">I don't have any account?</CustomSwitchLink>
            </form>
        </div>
    </div>
};

export default LoginPage;