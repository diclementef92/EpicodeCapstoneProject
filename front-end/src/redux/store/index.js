// questo file si occupa di creare lo store all'avvio dell'applicazione

import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

//persist
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, mainReducer);

// configureStore ha bisogno della struttura del nostro store/stato globale, come parametro principale (quindi un reducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
