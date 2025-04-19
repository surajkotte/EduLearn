import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slice/modalSlice";

export default function Modal({
  uniqueKey,
  maxWidth, // xs | sm | md | lg | xl
  children,
  title,
  closeOnOutsideClick,
  onOutsideClick,
  style,
}) {
  const modal = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  if (modal.key != uniqueKey) return null;

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={modal.key === uniqueKey ? true : false}
      onClose={() => {
        if (closeOnOutsideClick) {
          dispatch(closeModal());
        }
        onOutsideClick?.();
      }}
      className="rounded-2xl"
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {/* <DialogContent style={{ backgroundColor: "#0f1114" }}> */}
      <DialogContent className="rounded-2xl">{children}</DialogContent>
    </Dialog>
  );
}
