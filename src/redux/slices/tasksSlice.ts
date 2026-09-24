import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NewTask, Task } from "../../types/index.js";
import { generateId } from "../../utils/generateId.js";

export interface TaskState {
    items: Task[];
};

const initialState: TaskState = {items:[]};

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask(state,action:PayloadAction<NewTask>){
            const newTask : Task = {
                ...action.payload,
                id:generateId(),
                createdAt: new Date().toISOString(),
            };
            state.items.push(newTask); 
        },
        updateTask(state,action:PayloadAction<Task>){
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if(index!==-1) state.items[index] = action.payload;
        },
        deleteTask(state,action:PayloadAction<string>){
            state.items.filter(item => item.id !== action.payload);
        },
        unassignTasksByUser(state,action:PayloadAction<string>){
            state.items = state.items.map(item => item.assigneId === action.payload ? {...item,assignId:null} : item);
        },
        setTasks(state,action:PayloadAction<Task[]>){
            state.items = action.payload;
        }
    },
});

export const {addTask,updateTask,deleteTask,unassignTasksByUser,setTasks} = taskSlice.actions; 
export default taskSlice.reducer;