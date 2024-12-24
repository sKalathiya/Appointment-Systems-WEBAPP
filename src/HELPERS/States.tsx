import { createContext, useState } from "react";

export interface Route {
    type: string;
    title: string;
    title_id: string;
}

export interface RouteContextType {
    routes: Route[];
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
    activeRoute: Route;
    setActiveRoute: React.Dispatch<React.SetStateAction<Route>>;
}

export const RoutesContext = createContext<RouteContextType>({
    routes: [],
    setRoutes: () => {},
    activeRoute: { type: "List", title: "", title_id: "" },
    setActiveRoute: () => {},
});

export const ServiceRoutesProvider = ({ children }: any) => {
    const [routes, setRoutes] = useState<Route[]>([
        { type: "List", title: "Services", title_id: "" },
    ]);
    const [activeRoute, setActiveRoute] = useState<Route>({
        type: "List",
        title: "Services",
        title_id: "",
    });
    return (
        <RoutesContext.Provider
            value={{
                routes,
                setRoutes,
                activeRoute,
                setActiveRoute,
            }}
        >
            {children}
        </RoutesContext.Provider>
    );
};

export const EmployeeRoutesProvider = ({ children }: any) => {
    const [routes, setRoutes] = useState<Route[]>([
        { type: "List", title: "Employees", title_id: "" },
    ]);
    const [activeRoute, setActiveRoute] = useState<Route>({
        type: "List",
        title: "Employees",
        title_id: "",
    });
    return (
        <RoutesContext.Provider
            value={{
                routes,
                setRoutes,
                activeRoute,
                setActiveRoute,
            }}
        >
            {children}
        </RoutesContext.Provider>
    );
};

export const AppointmentRoutesProvider = ({ children }: any) => {
    const [routes, setRoutes] = useState<Route[]>([
        { type: "List", title: "Appointments", title_id: "" },
    ]);
    const [activeRoute, setActiveRoute] = useState<Route>({
        type: "List",
        title: "Appointments",
        title_id: "",
    });
    return (
        <RoutesContext.Provider
            value={{
                routes,
                setRoutes,
                activeRoute,
                setActiveRoute,
            }}
        >
            {children}
        </RoutesContext.Provider>
    );
};
