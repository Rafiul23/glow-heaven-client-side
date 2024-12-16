import { createBrowserRouter } from "react-router-dom";
import Root from "./../Root/Root";
import ErrorPage from "./../ErrorPage/ErrorPage";
import Home from "./../Home/Home";
import AddProducts from "./../AddProducts/AddProducts";
import MyCart from "./../MyCart/MyCart";
import Login from "./../Login/Login";
import Register from "./../Register/Register";
import ProductDetails from "./../ProductDetails/ProductDetails";
import UpdateProducts from "./../UpdateProduct/UpdateProduct";
import BrandDetails from "./../BrandDetails/BrandDetails";
import PrivateRoute from "./../PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import ManageProducts from "../ManageProducts/ManageProducts";
import AllUsers from "../ManageUsers/ManageUsers";
import Payment from "../Payment/Payment";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import MyOrder from "../MyOrder/MyOrder";
import ManageOrder from "../ManageOrder/ManageOrder";
import AddReviews from "../AddReviews/AddReviews";
import UserHome from "../UserHome/UserHome";
import AdminHome from "../AdminHome/AdminHome";
import AdminRoute from "../AdminRoute/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
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
          fetch(`https://glow-heaven-server.vercel.app/product/${params.id}`),
      },

      {
        path: "/details/:brand_name",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) =>
          fetch(
            `https://glow-heaven-server.vercel.app/products?brand_name=${params.brand_name}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "cart",
        element: <MyCart></MyCart>,
      },
      {
        path: "myOrder",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "review",
        element: <AddReviews></AddReviews>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      // admin
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageProducts",
        element: (
          <AdminRoute>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <AdminRoute>
            <UpdateProducts></UpdateProducts>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://glow-heaven-server.vercel.app/product/${params.id}`),
      },
      {
        path: "addProduct",
        element: (
          <AdminRoute>
            <AddProducts></AddProducts>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageOrders",
        element: (
          <AdminRoute>
            <ManageOrder></ManageOrder>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
