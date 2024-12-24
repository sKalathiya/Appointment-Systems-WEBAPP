import { ToastContainer, toast } from "react-toastify";

export const alertSuccess = (msg: string) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
    });
};

export const Notification = () => {
    return <ToastContainer />;
};
