import { combineReducers } from "@reduxjs/toolkit";
// Import additional reducers as needed
import authReducer from "./authSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

// Combine multiple reducers
const rootReducer = combineReducers({
    // Example future reducer
    auth: authReducer
});

export default persistReducer(persistConfig, rootReducer);


