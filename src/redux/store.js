import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import loadingReducer from "./slices/loadingSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingReducer,
    user: userReducer,
  },
});

export default store;
