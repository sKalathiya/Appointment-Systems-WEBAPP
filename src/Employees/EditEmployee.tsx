import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IEmployeePost, Service } from "../HELPERS/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployee, updateEmployee } from "./api";
import { RoutesContext } from "../HELPERS/States";
import MultipleSelect from "./MultipleSelect";
import { alertSuccess } from "../HELPERS/Alert";
import DeleteEmployee from "./DeleteEmployee";

interface EditEmployeeProps {
    id: string;
}

const EditEmployee = ({ id }: EditEmployeeProps) => {
    const {
        setActiveRoute: setActiveEmployeeRoute,
        routes: employeeRoutes,
        setRoutes: setEmployeeRoutes,
        activeRoute: activeEmployeeRoute,
    } = useContext(RoutesContext);
    const { data: employee, isLoading } = useQuery({
        queryFn: () => getEmployee(id),
        queryKey: ["Employee", id],
    });

    const queryClient = useQueryClient();

    const {
        mutate: updateEmployeeQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: (data: IEmployeePost) => updateEmployee(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Employee", id],
            });
        },
    });

    useEffect(() => {
        if (dataModel.firstName == "" && !isLoading) {
            setDataModel({ ...employee, services: [] });
            setServiceList([...employee.services]);
        }

        if (
            dataModel.firstName !== activeEmployeeRoute.title &&
            dataModel.firstName !== ""
        ) {
            employeeRoutes[1].title = dataModel.firstName;
            setEmployeeRoutes([...employeeRoutes]);
            setActiveEmployeeRoute(employeeRoutes[1]);
        }
        if (data) {
            alertSuccess("Update Successful!");
        }
        reset();
    }, [data, isLoading]);

    const [dataModel, setDataModel] = useState<IEmployeePost>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        schedule: [],
        services: [],
    });

    const [serviceList, setServiceList] = useState<Service[]>([]);

    if (isLoading) {
        return (
            <center>
                <span className="loading loading-infinity loading-lg"></span>
            </center>
        );
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataModel({ ...dataModel, [name]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        serviceList.forEach((tmp) => dataModel.services.push(tmp._id));
        updateEmployeeQuery(dataModel);
    };

    return (
        <section className="flex flex-col gap-4 mx-8">
            <section className="grid grid-rows-2 grid-cols-2 p-4 gap-8">
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">First Name :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="First Name"
                        value={dataModel.firstName}
                        name="firstName"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Last Name :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="Last Name"
                        value={dataModel.lastName}
                        name="lastName"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Email :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="Email"
                        value={dataModel.email}
                        name="email"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Phone :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="Phone"
                        value={dataModel.phone}
                        name="phone"
                        onChange={(e) => onChange(e)}
                    />
                </div>
            </section>
            <MultipleSelect
                label="Services"
                items={serviceList}
                setItems={setServiceList}
            />
            <button onClick={onSubmit} className="btn btn-accent self-end mx-4">
                {isPending ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : (
                    "Save"
                )}
            </button>
            <div className="divider px-4"></div>
            <DeleteEmployee id={id} />
        </section>
    );
};

export default EditEmployee;
