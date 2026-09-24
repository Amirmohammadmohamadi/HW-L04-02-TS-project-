import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key:string,initialValue:T) => {
    const [value , setValue] = useState<T>(()=>{
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(()=> {
        try{
            localStorage.setItem(key,JSON.stringify(value));
        } catch(err) {
            console.log("Failed to save to localStorage:",err);
        }
    },[key,value]);

    return [value,setValue] as const;
};
