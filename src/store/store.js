import { configureStore } from "@reduxjs/toolkit";

// Features
import userSlice from "./features/userSlice";
import newsSlice from "./features/newsSlice";
import blogSlice from "./features/blogSlice";
import modalSlice from "./features/modalSlice";
import donateSlice from "./features/donateSlice";
import streamsSlice from "./features/streamsSlice";
import productsSlice from "./features/productsSlice";
import homeProductsSlice from "./features/homeProductsSlice";
import balanceHistorySlice from "./features/balanceHistorySlice";

export default configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    blogs: blogSlice,
    modal: modalSlice,
    donate: donateSlice,
    streams: streamsSlice,
    products: productsSlice,
    homeProducts: homeProductsSlice,
    balanceHistory: balanceHistorySlice,
  },
});
