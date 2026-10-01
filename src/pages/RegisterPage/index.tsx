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
import FormError from "../../components/FormError/index.js";
import { useToast } from "../../hooks/useToast.js";

const registerSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).required(),
    confirmPassword: Yup.string().required().oneOf([Yup.ref("password")],"this isn't match with password"),
    role: Yup.mixed<Role>().oneOf(["manager","member"],"The role is invalid.").required(),
});

type RegisterFormType = Yup.InferType<typeof registerSchema>;

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
    const { error:errorToast , success:successToast} = useToast();

    const onSubmit = async(data:RegisterFormType):Promise<void> => {
        const {confirmPassword , ...userData} = data;
        const res = await register(userData);

        if(!res.success) {
            errorToast(res.error);
            return;
        }
        reset({name:"",email:"",password:"",confirmPassword:"",role:"member"});
        successToast("your registration was successfully");
        navigate("/login");
    }

    return <div className={styles.registerPageContainer}>
        <div className={styles.registerCard}>
            <h2>Registration</h2>
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
                        <div>
                            <select className={styles.roleSelection} value={field.value} onChange={field.onChange}>
                                <option disabled>role selecting</option>
                                <option value="member">member</option>
                                <option value="manager">manager</option>
                            </select>
                            <FormError error={errors.role?.message ?? ""}/>
                        </div>
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