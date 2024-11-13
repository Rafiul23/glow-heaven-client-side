import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import router from "./Components/Router/Router.jsx";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
