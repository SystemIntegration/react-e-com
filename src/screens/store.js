import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartValue from "./redux/cartValue";

const persistConfig = {
  key: "cartValue",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartValue);

const store = configureStore({
  reducer: persistedReducer,
});

const persistStores = persistStore(store);

export { store, persistStores };