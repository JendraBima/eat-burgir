import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer} from 'react-toastify';
import { RouterProvider } from "react-router";
import { router } from "./lib/router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
       <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
);
