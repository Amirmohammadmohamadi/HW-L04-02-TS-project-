import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, AuthResult, NewUser, User } from "../types/index.js";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import { STORAGE_KEY } from "../redux/index.js";
import { addUser } from "../redux/slices/userSlice.js";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps {
    children: ReactNode;
};

export const AuthContextProvider = ({children}:AuthContextProps) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.items);

    const [user,setUser] = useState<User | null>(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=> {
        try {   
            const raw = localStorage.getItem(STORAGE_KEY);
            if(raw) {
                const parsed = JSON.parse(raw) as User;
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
            setUser(foundUser);
            try {
                localStorage.setItem(STORAGE_KEY,JSON.stringify(foundUser));
            } catch (err) {
                console.log("Failed to save auth user:",err);
            }

            return {success:true};
        },[user]
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

    const value : AuthContextType = {
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}