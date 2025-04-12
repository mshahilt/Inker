import { configureStore } from "@reduxjs/toolkit";
import blogEditorReducer from "./slices/blogSlice";
import authReducer from './slices/authSlice'
import confirmDialogReducer from './slices/confirmDialogSlice'


export const store = configureStore({
  reducer: {
    blogEditor: blogEditorReducer,
    auth: authReducer,
    confirmDialog: confirmDialogReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;