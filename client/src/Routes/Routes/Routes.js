import DashboardLayout from "../../Layouts/DashboardLayOut";
import AllProducts from "../../Pages/AllProducts.js/AllProducts";
import Blogs from '../../Pages/Blogs/Blogs';
import CategoryProducts from "../../Pages/CategoryProducts/CategoryProducts";
import AllSellers from "../../Pages/Dashboard/AdminDashBoard/AllSellers/AllSellers";
import ReportedItems from "../../Pages/Dashboard/AdminDashBoard/ReportedItems/ReportedItems";
import MyOrders from "../../Pages/Dashboard/BuyerDashBoard/MyOrders/MyOrders";
import Payment from "../../Pages/Dashboard/BuyerDashBoard/Payment/Payment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyProducts from "../../Pages/Dashboard/SellerDashBoard/MyProducts/MyProducts";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Login from "../../Pages/LoginAndRegister/Login/Login";
import Registration from "../../Pages/LoginAndRegister/Registration/Registration";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import AllBuyers from './../../Pages/Dashboard/AdminDashBoard/AllBuyers/AllBuyers';
import AddProduct from './../../Pages/Dashboard/SellerDashBoard/AddProduct/AddProduct';
import BuyerRoute from './../BuyerRoute/BuyerRoute';
const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layouts/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "categories/:name",
        loader: ({ params }) =>
          fetch(`https://beche-fel-server.vercel.app/products/${params.name}`),
        element: <CategoryProducts></CategoryProducts>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/add-product",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/sellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`https://beche-fel-server.vercel.app/bookedPhone/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;