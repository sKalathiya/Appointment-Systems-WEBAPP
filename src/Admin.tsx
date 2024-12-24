import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import { Notification } from "./HELPERS/Alert";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
    return (
        <>
            <Notification />
            <Navbar />
            <Outlet />
        </>
    );
}

export default Admin;
