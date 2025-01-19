import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Components
import Modal from "./components/Modal";

// Toaster (For notification)
import { Toaster } from "react-hot-toast";

// Redux
import { useSelector } from "react-redux";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Success from "./pages/Success";
import Product from "./pages/Product";
import Streams from "./pages/Streams";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Contests from "./pages/Contests";
import VerifyOTP from "./pages/VerifyOTP";
import DonateBox from "./pages/DonateBox";
import Dashboard from "./pages/Dashboard";
import NewStream from "./pages/NewStream";
import Statistics from "./pages/Statistics";
import NewsDetail from "./pages/NewsDetail";
import BalanceHistory from "./pages/BalanceHistory";

const App = () => {
  const modal = useSelector((state) => state.modal);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* For user */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products/:productType?" element={<Products />} />
          <Route path="products/product/:productId" element={<Product />} />
          <Route path="search" element={<Search />} />
          <Route path="success" element={<Success />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-otp" element={<VerifyOTP />} />
          </Route>
        </Route>

        {/* For admin */}
        <Route path="/admin/:a?" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/news" element={<News />} />
          <Route path="dashboard/news/:newsId" element={<NewsDetail />} />
          <Route path="dashboard/donate" element={<DonateBox />} />
          <Route
            element={<BalanceHistory />}
            path="dashboard/balance-history"
          />
          <Route element={<Contests />} path="dashboard/contests" />
          <Route path="new-stream" element={<NewStream />} />
          <Route path="streams" element={<Streams />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      {/* Router */}
      <RouterProvider router={router} />

      {/* Toaster */}
      <Toaster />

      {/* Modal */}
      {modal.isOpen && <Modal />}
    </>
  );
};

export default App;
