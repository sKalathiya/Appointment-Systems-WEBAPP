import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./api";
import { Employee, Service } from "../HELPERS/types";

interface ListEmployeeProps {
    addRoute: (type: string, title: string, title_id: string) => void;
}

const ListEmployee = ({ addRoute }: ListEmployeeProps) => {
    const {
        data: employees,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getEmployees(),
        queryKey: ["employees"],
    });
    return (
        <>
            {isLoading ? (
                <center>
                    <span className="loading loading-infinity loading-lg"></span>
                </center>
            ) : isError ? (
                <center className="text-red-500 text-xl">
                    Something went wrong!
                </center>
            ) : (
                <section className="flex flex-col gap-4">
                    {employees.map((employee: Employee) => (
                        <div
                            className="card bg-base-300 shadow-md"
                            key={employee._id}
                        >
                            <div className="card-body gap-4">
                                <div className="grid grid-rows-1 grid-cols-4 max-md:grid-rows-2 max-md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-400 font-medium">
                                            First name
                                        </label>
                                        <p
                                            className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={employee.firstName}
                                        >
                                            {employee.firstName}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <label className="text-gray-400 font-medium">
                                                Last name
                                            </label>
                                            <p
                                                className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={employee.lastName}
                                            >
                                                {employee.lastName}
                                            </p>
                                        </div>
                                        <i
                                            onClick={() =>
                                                addRoute(
                                                    "Edit",
                                                    employee.firstName,
                                                    employee._id
                                                )
                                            }
                                            className="fas fa-pen cursor-pointer md:hidden"
                                            title="Edit"
                                        ></i>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 font-medium">
                                            Email
                                        </label>
                                        <p
                                            className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={employee.email}
                                        >
                                            {employee.email}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <label className="text-gray-400 font-medium">
                                                Phone
                                            </label>
                                            <p className="font-medium">
                                                {employee.phone.toString()}
                                            </p>
                                        </div>

                                        <i
                                            onClick={() =>
                                                addRoute(
                                                    "Edit",
                                                    employee.firstName,
                                                    employee._id
                                                )
                                            }
                                            className="fas fa-pen cursor-pointer max-md:hidden"
                                            title="Edit"
                                        ></i>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 font-medium">
                                        Services
                                    </label>

                                    <div className="grid grid-rows-* grid-cols-4 gap-2 max-md:grid-cols-1">
                                        {employee.services.map(
                                            (service: Service) => (
                                                <p
                                                    className="rounded-box text-sm p-3 bg-base-200"
                                                    key={service._id}
                                                >
                                                    {service.name}
                                                </p>
                                            )
                                        )}
                                        {employee.services.length == 0 && (
                                            <p> No service selected yet!</p>
                                        )}
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="btn btn-accent"
                                        title="Schedule"
                                        onClick={() =>
                                            addRoute(
                                                "Schedule",
                                                employee.firstName,
                                                employee._id
                                            )
                                        }
                                    >
                                        <i className="fas fa-calendar-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ListEmployee;
