import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/client/home/Home";
import ProductsPage from "../pages/client/productsPage/ProductsPage";
import DetailProduct from "../pages/client/detail-product/DetailProduct";
import Cart from "../pages/client/cart/Cart";
import Login from "../pages/auth/login/Login";
import { Register } from "../pages/auth/register/Register";
import Profile from "../pages/client/profile/Profile";
import Favorite from "../pages/client/favorite/Favorite";
import Blog from "../pages/client/Blog/Blog";
import InvoiceList from "../pages/client/order/Orders";
import OrderDetail from "../pages/client/order-detail/OrderDetail";
import SuccessMessage from "../pages/client/succsess-message/SuccsesMessage";
import SendTokenMail from "../pages/client/mail/SendTokenMail";
import VerifyTokenMail from "../pages/client/mail/VerifyTokenMail";
import ForgotPassword from "../pages/client/forgotPassword/ForgotPassword";
import ChangePassword from "../pages/client/changePassword/ChangePassword";
import Checkout from "../pages/client/checkout/Checkout";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import LayoutAD from "../layout/LayoutAD";
import ListProducts from "../pages/admin/products/ListProducts";
import CreateProduct from "../pages/admin/products/CreateProduct";
import UpdateProduct from "../pages/admin/products/UpdateProduct";
import Layout from "../layout/Layout";
import ListCategories from "../pages/admin/categories/ListCategories";
import CreateCategory from "../pages/admin/categories/CreateCategory";
import ListOrders from "../pages/admin/orders/ListOrders";
import UpdateOrder from "../pages/admin/orders/UpdateOrder";
import ListComments from "../pages/admin/comment/ListComments";
import ListUsers from "../pages/admin/users/ListUsers";
import UpdateCategory from "../pages/admin/categories/UpdateCategory";
import DashBroad from "../pages/admin/dashbroad/DashBroad";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/product/:id', element: <DetailProduct /> },
      { path: '/cart', element: <Cart /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/profile', element: <Profile /> },
      { path: '/favorite', element: <Favorite /> },
      { path: '/blog', element: <Blog /> },
      { path: '/order', element: <InvoiceList /> },
      { path: '/order/:id', element: <OrderDetail /> },
      { path: '/message', element: <SuccessMessage /> },
      { path: '/sendTokenMail', element: <SendTokenMail /> },
      { path: '/verifyTokenMail', element: <VerifyTokenMail /> },
      { path: '/forgotPassword', element: <ForgotPassword /> },
      { path: '/changePassword', element: <ChangePassword /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin',
    element: <LayoutAD />,
    children: [
      { path: '/admin/', element: <DashBroad /> },
      { path: '/admin/products', element: <ListProducts /> },
      { path: '/admin/product/add', element: <CreateProduct /> },
      { path: '/admin/product/update/:id', element: <UpdateProduct /> },
      { path: '/admin/categories', element: <ListCategories /> },
      { path: '/admin/category/update/:id', element: <UpdateCategory /> },
      { path: '/admin/category/add', element: <CreateCategory /> },
      { path: '/admin/orders', element: <ListOrders /> },
      { path: '/admin/order/update/:id', element: <UpdateOrder /> },
      { path: '/admin/comments', element: <ListComments /> },
      { path: '/admin/users', element: <ListUsers /> },
    ],
  },
]);