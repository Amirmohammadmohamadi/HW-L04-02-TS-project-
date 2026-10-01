import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import type { Toast, ToastContextType, ToastType } from "../types/index.js";
import { generateId } from "../utils/generateId.js";

interface ToastProviderProps {
    children:ReactNode;
}

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastContextProvider = ({children}:ToastProviderProps) => {
    const [toasts,setToasts] = useState<Toast[]>([]);

    const dismissToast = useCallback(
        (id:string) => setToasts(prev => prev.filter(t => t.id !== id))   
    ,[]);

    const showToast = useCallback(
        (message:string,type:ToastType,duration:number) => {
            const newToast : Toast = {
                id:generateId(),
                type,
                message,
                duration: duration ?? 1500,
            };
            setToasts(prev => [...prev,newToast]);
            setTimeout(()=>dismissToast(newToast.id),duration)
        }
    ,[dismissToast]);

    const success = useCallback(
        (message:string) => showToast(message,"success",3000) 
    ,[showToast]);

    const error = useCallback(
        (message:string) => showToast(message,"error",4000) 
    ,[showToast]);

    const warning = useCallback(
        (message:string) => showToast(message,"warning",4000)
    ,[showToast]);

    const info = useCallback(
        (message:string) => showToast(message,"info",3500)
    ,[showToast]);

    const value : ToastContextType = useMemo(
        () => (
            {
                toasts,
                showToast,
                dismissToast,
                success,
                error,
                warning,
                info,
            }
        )
    ,[toasts,showToast,dismissToast,success,error,warning,info]);
    

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
};

export default ToastContextProvider;