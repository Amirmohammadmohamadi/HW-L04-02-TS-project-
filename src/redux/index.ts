import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { setUsers } from "./slices/userSlice.js";
import projectsRducer, { setProjects } from "./slices/projectsSlice.js";
import tasksReducer, { setTasks } from "./slices/tasksSlice.js";

const STORAGE_KEY = "ttm-state";

export const store = configureStore({
    reducer:{
        users:usersReducer,
        projects:projectsRducer,
        tasks:tasksReducer,
    },
});

try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) {
        const parsed = JSON.parse(raw);
        if(parsed.users) store.dispatch(setUsers(parsed.users));
        if(parsed.projects) store.dispatch(setProjects(parsed.projects));
        if(parsed.tasks) store.dispatch(setTasks(parsed.tasks));
    }
} catch (err) {
    console.error("Failed to load state:",err);
}

store.subscribe(()=> {
    try {
        const state = store.getState();
        localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    } catch (err) {
        console.error("Failed to save state:",err);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;