import { configureStore } from "@reduxjs/toolkit";
import blogEditorReducer from "./slices/blogSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    blogEditor: blogEditorReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;