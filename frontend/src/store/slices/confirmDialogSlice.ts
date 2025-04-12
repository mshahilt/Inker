import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const initialState: ConfirmDialogState = {
  open: false,
  title: "",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: undefined,
};

const confirmDialogSlice = createSlice({
  name: "confirmDialog",
  initialState,
  reducers: {
    showConfirmDialog(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm?: () => void;
      }>
    ) {
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    },
    hideConfirmDialog(state) {
      return { ...state, open: false };
    },
  },
});

export const { showConfirmDialog, hideConfirmDialog } = confirmDialogSlice.actions;

export default confirmDialogSlice.reducer;
