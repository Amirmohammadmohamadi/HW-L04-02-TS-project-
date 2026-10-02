export type Role = "manager" | "member";
export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";
export type ToastType = "success" | "error" | "warning" | "info";

export interface User {
    id:string;
    name:string;
    email:string;
    password:string;
    role:Role;
    createdAt:string;
};

export interface Project {
    id:string;
    title:string;
    descriprion:string;
    ownerId:string;
    createdAt:string;
};

export interface Task {
    id:string;
    porjectId:string;
    title:string;
    description:string;
    priority:Priority;
    status:Status;
    dueDate:string;
    assigneId:string | null;
    createdAt:string;
};

export interface Toast {
    id:string;
    type: ToastType;
    message:string;
    duration:number;
};

export type NewUser = Omit<User,"id" | "createdAt">;
export type NewProject = Omit<Project,"id" | "createdAt" | "ownerId">;
export type NewTask = Omit<Task, "id" | "createdAt">;
export type NewToast = Omit<Toast,"id">;
export type AuthUser = Pick<User, "id" | "name" | "email" | "role">;

export type UpdateUsersPayload = {id:string} & Partial<Omit<User,"id" | "createdAt">>;

export interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email:string,password:string) => Promise<AuthResult>;
    register: (data:NewUser) => Promise<AuthResult>;
    logout: () => void;
};

export type AuthResult = 
    | {success: true} 
    | {success: false; error:string};

export type HelperType = (message:string) => void;

export interface ToastContextType {
    toasts: Toast[];
    showToast: (message:string,type:ToastType,duration:number) => void;
    dismissToast: (id:string) => void;
    success: HelperType;
    error: HelperType;
    warning: HelperType;
    info: HelperType;
}