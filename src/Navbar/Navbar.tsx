import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logout from "../Autentication/Logout";
import UpdatePassword from "../Autentication/updatePassword";

const Navbar = () => {
    const [currentTab, setCurrentTab] = useState("");
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    useEffect(() => {
        setCurrentTab(window.location.pathname);
    });
    const navigate = useNavigate();
    const employeeOption = (
        <div
            className={
                "p-2 hover:cursor-pointer hover:rounded-box  hover:underline underline-offset-8 hover:text-accent font-bold " +
                (currentTab == "/admin/employees"
                    ? " underline underline-offset-8 text-accent"
                    : "")
            }
            onClick={() => {
                setCurrentTab("/admin/employees");
                navigate("/admin/employees");
            }}
        >
            Employees
        </div>
    );

    const appointmentOption = (
        <div
            className={
                "p-2 hover:cursor-pointer hover:rounded-box  hover:underline underline-offset-8 hover:text-accent font-bold " +
                (currentTab == "/admin/appointments"
                    ? " underline underline-offset-8 text-accent"
                    : "")
            }
            onClick={() => {
                setCurrentTab("/admin/appointments");
                navigate("/admin/appointments");
            }}
        >
            Appointments
        </div>
    );

    const serviceOption = (
        <div
            className={
                "p-2 hover:cursor-pointer hover:rounded-box  hover:underline underline-offset-8 hover:text-accent font-bold " +
                (currentTab == "/admin/services"
                    ? " underline underline-offset-8 text-accent"
                    : "")
            }
            onClick={() => {
                setCurrentTab("/admin/services");
                navigate("/admin/services");
            }}
        >
            Services
        </div>
    );

    const signOut = <Logout />;
    const updatePassword = <UpdatePassword />;

    return (
        <Box className="p-3 shadow-md fixed top-0 z-10 w-full bg-base-200">
            <div className="navbar ">
                <div className="text-2xl font-bold navbar-start text-nowrap">
                    Appointment Systems
                </div>
                <div className="navbar-center flex flex-row gap-2 max-md:hidden">
                    {employeeOption}
                    {appointmentOption}
                    {serviceOption}
                </div>

                <div className="navbar-end md:hidden">
                    <div className="dropdown ">
                        <div role="button" className="btn " tabIndex={0}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <div
                            tabIndex={0}
                            className="menu menu-sm dropdown-content absolute right-0 m-1 p-4 bg-base-300 rounded-box items-center flex-col gap-4 animate-fade-in"
                        >
                            {employeeOption}
                            {appointmentOption}
                            {serviceOption}
                            {signOut}
                        </div>
                    </div>
                </div>
                <div className="max-md:hidden navbar-end">
                    <UpdatePassword />
                    <Logout />
                    {theme == "light" ? (
                        <div
                            className="btn ml-2"
                            onClick={() => setTheme("dracula")}
                        >
                            <i className="fas fa-moon"></i>
                        </div>
                    ) : (
                        <div
                            className="btn ml-2"
                            onClick={() => setTheme("light")}
                        >
                            <i className="fas fa-sun"></i>
                        </div>
                    )}
                </div>
            </div>
        </Box>
    );
};

export default Navbar;
