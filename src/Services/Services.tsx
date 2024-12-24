import { useContext } from "react";
import AddService from "./AddService";
import { Route, RoutesContext } from "../HELPERS/States";
import EditService from "./EditService";
import ListService from "./ListService";
import DeleteService from "./DeleteService";

const Services = () => {
    const {
        routes: serviceRoutes,
        setRoutes: setServiceRoutes,
        activeRoute: activeServiceRoute,
        setActiveRoute: setActiveServiceRoute,
    } = useContext(RoutesContext);

    const addRoute = (type: string, title: string, title_id: string) => {
        setServiceRoutes([...serviceRoutes, { type, title, title_id }]);
        setActiveServiceRoute({ type, title, title_id });
    };

    const goToRoute = (route: Route) => {
        let found = false;
        setServiceRoutes([
            ...serviceRoutes.filter((r) => {
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
        setActiveServiceRoute(route);
    };

    const homeRoute = () => {
        setServiceRoutes([serviceRoutes[0]]);
        setActiveServiceRoute(serviceRoutes[0]);
    };

    return (
        <div className="shadow-md py-6 px-8 mb-4 mt-28 mx-12 rounded-box bg-base-200">
            <section className="flex flex-row justify-between items-center">
                {activeServiceRoute.title == "Services" ? (
                    <>
                        <div className="text-2xl font-semibold">Services</div>
                        <button
                            className="btn btn-accent "
                            title="Add Employee"
                            onClick={() => addRoute("Add", "Add", "")}
                        >
                            <i className="fas fa-plus-circle"></i>
                            <p className="max-md:hidden">Add Service</p>
                        </button>
                    </>
                ) : (
                    <div className="breadcrumbs">
                        <ul>
                            {serviceRoutes.map((route) => (
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
            {activeServiceRoute.title == "Services" && (
                <ListService addRoute={addRoute} />
            )}
            {activeServiceRoute.title == "Add" && <AddService />}
            {activeServiceRoute.type == "Edit" && (
                <EditService id={activeServiceRoute.title_id} />
            )}
            {activeServiceRoute.type == "Delete" && (
                <DeleteService
                    id={activeServiceRoute.title_id}
                    homeRoute={homeRoute}
                />
            )}
        </div>
    );
};

export default Services;
