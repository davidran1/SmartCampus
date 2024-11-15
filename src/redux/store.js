import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userDataSlice";
import { userDataApi } from "./rtk/userData";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userData: userDataReducer,
  [userDataApi.reducerPath]: userDataApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(userDataApi.middleware),
});

export const persistor = persistStore(store);