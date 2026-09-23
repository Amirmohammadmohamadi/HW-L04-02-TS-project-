import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.module.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.js";

const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error ("Element with id `root` not found in index.html!");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
