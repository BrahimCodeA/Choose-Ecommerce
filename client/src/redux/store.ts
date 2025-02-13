import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";
import cartRedcuer from "./slices/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartRedcuer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
