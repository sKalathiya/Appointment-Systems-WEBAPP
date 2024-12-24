import { Route, RoutesContext } from "../HELPERS/States";
import { useContext } from "react";

import BookAppointments from "../Appointments/BookAppointments";
import AppointmentSearch from "./AppointmentSearch";

const Appointments = () => {
    const {
        routes: appointmentsRoutes,
        setRoutes: setAppointmentsRoutes,
        activeRoute: activeAppointmentRoute,
        setActiveRoute: setActiveAppointmentRoute,
    } = useContext(RoutesContext);

    const addRoute = (type: string, title: string, title_id: string) => {
        setAppointmentsRoutes([
            ...appointmentsRoutes,
            { type, title, title_id },
        ]);
        setActiveAppointmentRoute({ type, title, title_id });
    };

    const goToRoute = (route: Route) => {
        let found = false;
        setAppointmentsRoutes([
            ...appointmentsRoutes.filter((r) => {
                if (r.title == route.title && !found) {
                    found = true;
                    return true;
                } else if (!found) {
                    return true;
                } else {
                    return false;
                }
            }),
        ]);
        setActiveAppointmentRoute(route);
    };

    return (
        <div className="shadow-md py-6 px-8 mb-4 mt-28 mx-12 rounded-box bg-base-200">
            <section className="flex flex-row justify-between items-center">
                {activeAppointmentRoute.title == "Appointments" ? (
                    <>
                        <div className="text-2xl font-semibold">
                            Appointments
                        </div>
                        <button
                            className="btn btn-accent"
                            title="Add Employee"
                            onClick={() => addRoute("Book", "Book", "")}
                        >
                            <i className="fas fa-plus-circle"></i>
                            <p className="max-md:hidden">Book Appointment</p>
                        </button>
                    </>
                ) : (
                    <div className="breadcrumbs">
                        <ul>
                            {appointmentsRoutes.map((route) => (
                                <li key={route.title}>
                                    <p
                                        onClick={() => goToRoute(route)}
                                        className="underline-offset-4 max-w-[150px] overflow-hidden text-ellipsis hover:underline cursor-pointer"
                                    >
                                        {route.title}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <div className="divider"></div>
            {activeAppointmentRoute.title == "Appointments" && (
                <AppointmentSearch />
            )}
            {activeAppointmentRoute.title == "Book" && <BookAppointments />}
        </div>
    );
};

export default Appointments;
