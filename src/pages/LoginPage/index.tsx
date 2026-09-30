import { useForm , Controller } from "react-hook-form";
import styles from "./loginPage.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormError from "../../components/FormError/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import type { User } from "../../types/index.js";
import { ImSpinner } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(4),
});
const LoginPage = () => {
    const { control , formState:{errors,isSubmitting} , handleSubmit , reset } = 
    useForm({resolver:yupResolver(loginSchema)});
    console.log("form errors:",errors);
    const { login } = useAuth();
    const navigate = useNavigate();


    const onSubmit = ({email,password}:Pick<User,"email" | "password">) => {
        login(email,password).then(res=> {
            if(res.success === false) alert(res.error);
            else {
                alert("you login successfuly :)");
                navigate("/");
            }
            reset({email:"",password:""});
        });
    }
    
    return <div className={styles.loginPageContainer}>
        <div className={styles.loginCard}>
            <h2>Login page</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="email"
                    control={control}
                    render={({field})=> <div>
                        <input type="email" placeholder="username" {...field}/>
                        <FormError error={errors.email?.message ?? ""}/>
                    </div>
                    }
                />
                <Controller 
                    name="password"
                    control={control}
                    render={({field})=> <div>
                        <input type="password" placeholder="password" {...field}/>
                        <FormError error={errors.password?.message ?? ""}/>
                    </div>
                    }
                />
                
                <button className={styles.button} type="submit">
                    {isSubmitting ? <ImSpinner fill="white" size={30} className={styles.spinnerIcon}/> : "Submit"}
                </button>
            </form>
        </div>
    </div>
};

export default LoginPage;