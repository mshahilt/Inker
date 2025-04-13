import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import confirmDialogReducer from './slices/confirmDialogSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    confirmDialog: confirmDialogReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;