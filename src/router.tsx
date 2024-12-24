import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Employees from "./Employees/Employees";
import Services from "./Services/Services";
import {
    AppointmentRoutesProvider,
    EmployeeRoutesProvider,
    ServiceRoutesProvider,
} from "./HELPERS/States";
import Authenticate from "./Autentication/Authenticate";
import Login from "./Autentication/login";
import Appointments from "./Appointments/Appointments";
import User from "./User/User";
import Admin from "./Admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/admin",
                element: (
                    <Authenticate>
                        <Admin />
                    </Authenticate>
                ),
                children: [
                    {
                        path: "employees",
                        element: (
                            <EmployeeRoutesProvider>
                                <Employees />
                            </EmployeeRoutesProvider>
                        ),
                    },
                    {
                        path: "services",
                        element: (
                            <ServiceRoutesProvider>
                                <Services />
                            </ServiceRoutesProvider>
                        ),
                    },
                    {
                        path: "appointments",
                        element: (
                            <AppointmentRoutesProvider>
                                <Appointments />
                            </AppointmentRoutesProvider>
                        ),
                    },
                ],
            },
            {
                path: "user",
                element: <User />,
                children: [],
            },
        ],
    },
    {
        path: "/admin/auth/login",
        element: <Login />,
    },
]);
