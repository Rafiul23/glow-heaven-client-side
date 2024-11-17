import { createBrowserRouter } from "react-router-dom";
import Root from './../Root/Root';
import ErrorPage from './../ErrorPage/ErrorPage';
import Home from './../Home/Home';
import AddProducts from './../AddProducts/AddProducts';
import MyCart from './../MyCart/MyCart';
import Login from './../Login/Login';
import Register from './../Register/Register';
import ProductDetails from './../ProductDetails/ProductDetails';
import UpdateProducts from './../UpdateProduct/UpdateProduct';
import BrandDetails from './../BrandDetails/BrandDetails';
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import Dashboard from "../Dashboard/Dashboard";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>
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
          path: "/details/:brand_name",
          element: <BrandDetails></BrandDetails>,
          loader: ({ params }) =>
            fetch(
              `http://localhost:5000/products?brand_name=${params.brand_name}`
            ),
        },
      ],
    }, 
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'cart',
          element: <MyCart></MyCart>
        },

        // admin
        {
          path: "update/:id",
          element: (
            <PrivateRoute>
              <UpdateProducts></UpdateProducts>
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetch(
              `http://localhost:5000/product/${params.id}`
            ),
        },
        {
          path: "addProduct",
          element: (
            <PrivateRoute>
              <AddProducts></AddProducts>
            </PrivateRoute>
          ),
        },
      ]
    }
  ]);

export default router;  