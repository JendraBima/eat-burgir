import { ToastContainer} from 'react-toastify';
import { RouterProvider } from "react-router";
import { router } from "./lib/router";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
