import { createBrowserRouter } from "react-router";
import LandingPages from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
]);
