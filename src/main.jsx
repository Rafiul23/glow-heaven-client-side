import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AddProducts from "./Components/AddProducts/AddProducts.jsx";
import MyCart from "./Components/MyCart/MyCart.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import BrandDetails from "./Components/BrandDetails/BrandDetails.jsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct.jsx";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("/brands.json"),
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProducts></AddProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/myCart",
        element: (
          <PrivateRoute>
            <MyCart></MyCart>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/product/${params.id}`
          ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/product/${params.id}`
          ),
      },
      {
        path: "/details/:brand_name",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) =>
          fetch(
            `https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/products/${params.brand_name}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </React.StrictMode>
);
