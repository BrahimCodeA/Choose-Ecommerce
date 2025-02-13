import { toast, ToastOptions } from "react-toastify";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export const showToast = (
  message: string,
  type: ToastType = ToastType.SUCCESS,
  options?: ToastOptions
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1000,
    style: {
      backgroundColor: "#282c34",
      color: "#ffffff",
      fontFamily: "'Arial', sans-serif",
    },
    ...options,
  });
};
