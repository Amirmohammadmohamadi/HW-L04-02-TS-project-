import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextType, AuthResult, AuthUser, NewUser, User } from "../types/index.js";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import { addUser } from "../redux/slices/userSlice.js";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps {
    children: ReactNode;
};

const STORAGE_KEY = "ttm-auth-user";

export const AuthContextProvider = ({children}:AuthContextProps) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.items);

    const [user,setUser] = useState<AuthUser | null>(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=> {
        try {   
            const raw = localStorage.getItem(STORAGE_KEY);
            if(raw) {
                const parsed = JSON.parse(raw) as AuthUser;
                setUser(parsed);
            } 
        } catch (err) {
            console.error("Failed to load auth user:",err);
        } finally {
            setIsLoading(false);
        }
    },[]);

    const login = useCallback(
        async (email:string,password:string):Promise<AuthResult> => {
            await new Promise((res) => setTimeout(res,300));
            const foundUser = users.find(u => u.email === email && u.password === password);

            if(!foundUser) {
                return {success:false,error:"email or password is incorrect!"};
            }

            const authUser:AuthUser = {
                id:foundUser.id,
                name:foundUser.name,
                email:foundUser.email,
                role:foundUser.role,
            }

            setUser(authUser);

            try {
                localStorage.setItem(STORAGE_KEY,JSON.stringify(authUser));
            } catch (err) {
                console.error("Failed to save auth user:",err);
            }

            return {success:true};
        },[users]
    );

    const register = useCallback(
        async (data:NewUser): Promise<AuthResult> => {
            await new Promise(res => setTimeout(res,300));
            
            const existing = users.find(u=> u.email === data.email);

            if(existing) {
                return {success:false , error:"this email has registerd already!"};
            }
            
            dispatch(addUser(data));
            return {success:true};
        },[users,dispatch]
    );

    const logout = useCallback(()=>{
        setUser(null);
        try{
            localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
            console.error("Failed to clear auth user",err);
        }
    },[]);

    const value : AuthContextType = useMemo(()=>(
        {
            user,
            isAuthenticated: user !== null,
            isLoading,
            login,
            register,
            logout,
        }
    ),[user,isLoading,login,register,logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}