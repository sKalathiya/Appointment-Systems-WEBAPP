import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RoutesContext } from "../HELPERS/States";
import { alertSuccess } from "../HELPERS/Alert";
import { deleteEmployee } from "./api";

interface DeleteEmployeeProps {
    id: string;
}

const DeleteEmployee = ({ id }: DeleteEmployeeProps) => {
    const {
        activeRoute: activeEmployeeRoute,
        setRoutes: setEmployeeRoutes,
        setActiveRoute: setActiveEmployeeRoute,
        routes: employeeRoutes,
    } = useContext(RoutesContext);
    const queryClient = useQueryClient();

    const {
        mutate: deleteServiceQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: () => deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Employee", id],
            });
        },
    });

    const [service, setService] = useState<string>("");
    const [inputError, setInputError] = useState<string>("");

    useEffect(() => {
        if (data) {
            setEmployeeRoutes([employeeRoutes[0]]);
            setActiveEmployeeRoute(employeeRoutes[0]);
            alertSuccess("Delete Successful!");
            setInputError("");
            setService("");
            reset();
        }
    }, [data]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (service != activeEmployeeRoute.title) {
            setInputError("Employee name does not match!");
            return;
        }
        deleteServiceQuery();
    };
    return (
        <section className="flex flex-col gap-4 px-4">
            <p className="text-2xl font-bold">Delete</p>
            <p>
                Please enter{" "}
                <div className="font-medium badge badge-error badge-outline p-3">
                    {activeEmployeeRoute.title}
                </div>{" "}
                for it to be deleted.
            </p>
            {inputError && <p className=" text-error">{inputError}</p>}
            <div className="input input-bordered flex items-center gap-2">
                <p className="max-lg:hidden text-nowrap">Service :</p>
                <input
                    type="text"
                    className="w-full"
                    placeholder="Employee"
                    value={service}
                    name="name"
                    onChange={(e) => setService(e.target.value)}
                />
            </div>

            <button onClick={onSubmit} className="btn btn-error self-end">
                {isPending ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : (
                    "Delete"
                )}
            </button>
        </section>
    );
};

export default DeleteEmployee;
