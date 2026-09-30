import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.module.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.js";
import { Provider } from "react-redux"
import { store } from "./redux/index.js";
import { AuthContextProvider } from "./context/AuthContext.js";

const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error ("Element with id `root` not found in index.html!");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store} >
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
    </Provider>
  </StrictMode>
);
