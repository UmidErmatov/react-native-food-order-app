import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./features/app";
import cartReducer from "./features/cart/cartSlice";
import photosReducer from "./features/photos/photosSlice";
import searchReducer from "./features/search/searchSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        photos: photosReducer,
        app: appReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})