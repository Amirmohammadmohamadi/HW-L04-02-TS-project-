import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NewProject, Project } from "../../types/index.js";
import { generateId } from "../../utils/generateId.js";

export interface ProjectState {
    items:Project[];
};

const initialState : ProjectState = {items:[]};

const projectSlice = createSlice({
    name:"projects",
    initialState,
    reducers:{
        addProject(state,action:PayloadAction<NewProject & {ownerId:string}>){
            const newProject = {
                ...action.payload,
                id:generateId(),
                createdAt:new Date().toISOString(),
            };
            state.items.push(newProject); 
        },
        updateProject(state,action:PayloadAction<Project>){
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if(index !== -1) state.items[index] = action.payload;
        },
        deleteProject(state,action:PayloadAction<string>){
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setProjects(state,action:PayloadAction<Project[]>){
            state.items = action.payload;
        },
    }
});

export const {addProject,updateProject,deleteProject,setProjects} = projectSlice.actions;
export default projectSlice.reducer;