import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NewUser, UpdateUsersPayload, User } from "../../types/index.js";
import { generateId } from "../../utils/generateId.js";

export interface UserState {
    items:User[];
};

const initialState:UserState = {
    items:[]
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser(state,action:PayloadAction<NewUser>){
            const newUser : User = {
                ...action.payload,
                id:generateId(),
                createdAt:new Date().toISOString(),
            }
            state.items.push(newUser);
        },
        updateUser(state,action:PayloadAction<UpdateUsersPayload>){
            const user = state.items.find(item => item.id === action.payload.id);
            if(user) Object.assign(user,action.payload);
        },
        deleteUser(state,action:PayloadAction<string>){
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setUsers(state,action:PayloadAction<User[]>){
            state.items = action.payload;
        },
    }
});

export const {addUser,updateUser,deleteUser,setUsers} = usersSlice.actions;
export default usersSlice.reducer;