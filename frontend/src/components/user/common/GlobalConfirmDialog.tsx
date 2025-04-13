import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { hideConfirmDialog } from "@/store/slices/confirmDialogSlice";
import ConfirmDialog from "@/components/ui/confirm-dialog";

export const GlobalConfirmDialog = () => {
  const dispatch = useDispatch();
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
  } = useSelector((state: RootState) => state.confirmDialog);

  return (
    <ConfirmDialog
      open={open}
      setOpen={(val) => {
        if (!val) dispatch(hideConfirmDialog());
      }}
      title={title}
      description={description}
      confirmText={confirmText}
      cancelText={cancelText}
      onConfirm={() => {
        if (onConfirm) onConfirm();
        dispatch(hideConfirmDialog());
      }}
    />
  );
};
