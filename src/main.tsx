import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.module.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.js";
import { Provider } from "react-redux"
import { store } from "./redux/index.js";

const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error ("Element with id `root` not found in index.html!");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
