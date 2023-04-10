import Toastify from "toastify-js";

export type ToastTypes = "error" | "info" | "warning" | "success";

export interface ToastProps {
  message: string;
  type?: ToastTypes;
  duration?: number;
}

export function createToast({
  message,
  type = "info",
  duration = 3000,
}: ToastProps) {
  const baseClasses = "!flex !flex-row-reverse !items-center !gap-4 !rounded";
  const getClassName = () => {
    switch (type) {
      case "error":
        return "!bg-gradient-to-r !from-pink-500 !to-pink-800 !text-white";
      case "success":
        return "!bg-gradient-to-r !from-green-500 !to-green-800 !text-white";
      case "warning":
        return "!bg-gradient-to-r !from-orange-500 !to-orange-800 !text-white";
      default:
        return "!bg-gradient-to-r !from-purple-500 !to-purple-800 !text-white";
    }
  };

  const getAvartar = () => {
    switch (type) {
      case "error":
        return "/icons/alert-error.svg";
      case "success":
        return "/icons/alert-success.svg";
      case "warning":
        return "/icons/alert-warn.svg";
      default:
        return "/icons/alert-info.svg";
    }
  };
  const toastOpts: Toastify.Options = {
    duration,
    close: true,
    text: message,
    oldestFirst: true,
    position: "left",
    gravity: "bottom",
    avatar: getAvartar(),
    className: `${baseClasses} ${getClassName()}`,
  };
  return Toastify(toastOpts).showToast();
}
