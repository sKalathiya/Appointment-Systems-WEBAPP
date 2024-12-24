import ListEmployee from "./ListEmployee";
import AddEmployee from "./AddEmployee";
import { Route, RoutesContext } from "../HELPERS/States";
import { useContext } from "react";
import EditEmployee from "./EditEmployee";
import EditSchedule from "./EditSchedule";

const Employees = () => {
    const {
        routes: employeeRoutes,
        setRoutes: setEmployeeRoutes,
        activeRoute: activeEmployeeRoute,
        setActiveRoute: setActiveEmployeeRoute,
    } = useContext(RoutesContext);

    const addRoute = (type: string, title: string, title_id: string) => {
        setEmployeeRoutes([...employeeRoutes, { type, title, title_id }]);
        setActiveEmployeeRoute({ type, title, title_id });
    };

    const goToRoute = (route: Route) => {
        let found = false;
        setEmployeeRoutes([
            ...employeeRoutes.filter((r) => {
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
        setActiveEmployeeRoute(route);
    };

    return (
        <div className="shadow-md py-6 px-8 mb-4 mt-28 mx-12 rounded-box bg-base-200">
            <section className="flex flex-row justify-between items-center">
                {activeEmployeeRoute.title == "Employees" ? (
                    <>
                        <div className="text-2xl font-semibold">Employees</div>
                        <button
                            className="btn btn-accent"
                            title="Add Employee"
                            onClick={() => addRoute("Add", "Add", "")}
                        >
                            <i className="fas fa-plus-circle"></i>
                            <p className="max-md:hidden">Add Employee</p>
                        </button>
                    </>
                ) : (
                    <div className="breadcrumbs">
                        <ul>
                            {employeeRoutes.map((route) => (
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
            {activeEmployeeRoute.title == "Employees" && (
                <ListEmployee addRoute={addRoute} />
            )}
            {activeEmployeeRoute.title == "Add" && <AddEmployee />}
            {activeEmployeeRoute.type == "Edit" && (
                <EditEmployee id={activeEmployeeRoute.title_id} />
            )}
            {activeEmployeeRoute.type == "Schedule" && (
                <EditSchedule id={activeEmployeeRoute.title_id} />
            )}
        </div>
    );
};

export default Employees;
