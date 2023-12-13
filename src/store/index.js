import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cardReducer from "./card";
import userReducer from "./user";
import momentsReducer from "./moments";
import remonthsReducer from "./remonths";

const reducers = combineReducers({
  user: userReducer,
  card: cardReducer,
  moments: momentsReducer,
  remonths: remonthsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
