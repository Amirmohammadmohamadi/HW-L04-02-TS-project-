import styles from "./registerPage.module.scss"
import { useForm , Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/index.js";
import CustomButton from "../../components/CustomButton/index.js";
import CustomSpinner from "../../components/CustomSpinner/index.js";
import type { NewUser, Role } from "../../types/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

type RegisterFormType = NewUser & {confirmPassword:string};

const registerSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).required(),
    confirmPassword: Yup.string().required().oneOf([Yup.ref("password")],"this isn't match with password"),
    role: Yup.mixed<Role>().oneOf(["manager","member"],"The role is invalid.").required(),
})

const RegisterPage = () => {
    const { control , formState:{ errors , isSubmitting} , handleSubmit , reset } = 
        useForm<RegisterFormType>({
            resolver:yupResolver(registerSchema),
            defaultValues: {
                role: "member",
            }
        });
    const { register } = useAuth();
    const navigate = useNavigate();

    console.log("form errors:",errors);

    const onSubmit = async(data:RegisterFormType):Promise<void> => {
        console.log("data:",data);
        const res = await register({
            email:data.email,
            name:data.name,
            password:data.password,
            role:data.role
        });
        if(!res.success) {
            alert(res.error);
            return;
        }
        reset({name:"",email:"",password:"",confirmPassword:"",role:"manager"});
        alert("your registration was successfuly");
        navigate("/login");
    }

    return <div className={styles.registerPageContainer}>
        <div className={styles.registerCard}>
            <h2>Register</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({field})=>
                        <CustomInput 
                            type="text"
                            placeholder="name"
                            error={errors.name?.message ?? ""}
                            {...field}
                        />
                    }
                />
                <Controller
                    name="email"
                    control={control}
                    render={({field})=> 
                        <CustomInput 
                            type="email"
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
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field})=>
                        <CustomInput
                            type="password"
                            placeholder="confirm-password"
                            error={errors.confirmPassword?.message ?? ""}
                            {...field}
                        />
                    }
                />
                <Controller
                    name="role"
                    control={control}
                    render={({field})=>
                        <select className={styles.roleSelection} value={field.value} onChange={field.onChange}>
                            <option disabled>role</option>
                            <option value="member">member</option>
                            <option value="manager">manager</option>
                        </select>
                    }
                />
                <CustomButton title="" variant="primary" type="submit">
                    {isSubmitting ? <CustomSpinner size="25"/> : "Register"}
                </CustomButton>
            </form>
        </div>
    </div>
};

export default RegisterPage;