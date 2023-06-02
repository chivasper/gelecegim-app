import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInformation, { setLogin } from "./userInformation";
import adminInformation from "./adminInformation";
import tokenExpirationMiddleware from "./tokenExpirationMiddleware";

const persistConfig = { key: "root", storage, version: 1 };
const persistConfigAdmin = {
  key: "admin",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, userInformation);
const persistedAdminReducer = persistReducer(
  persistConfigAdmin,
  adminInformation
);

const store = configureStore({
  reducer: {
    userInformation: persistedReducer,
    adminInformation: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["userInformation.posts.headers"],
      },
    }).concat(tokenExpirationMiddleware),
});
const expirationTime = 300; // Örnek olarak 5 dakika (300 saniye)

// Oturum süresini kontrol etmek için başlatıcı eylemi tetikleyelim
store.dispatch(setLogin(expirationTime));
export const persistor = persistStore(store);
export default store;
