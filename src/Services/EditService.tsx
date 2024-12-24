import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Service } from "../HELPERS/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getService, updateService } from "./api";
import { RoutesContext } from "../HELPERS/States";
import { alertSuccess } from "../HELPERS/Alert";

interface EditServiceProps {
    id: string;
}

const EditService = ({ id }: EditServiceProps) => {
    const {
        setActiveRoute: setActiveServiceRoute,
        routes: serviceRoutes,
        setRoutes: setServiceRoutes,
        activeRoute: activeServiceRoute,
    } = useContext(RoutesContext);
    const { data: service, isLoading } = useQuery({
        queryFn: () => getService(id),
        queryKey: ["service", id],
    });

    const queryClient = useQueryClient();

    const {
        mutate: updateServiceQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: (data: Service) => updateService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["service", id],
            });
        },
    });

    useEffect(() => {
        if (dataModel._id == "" && !isLoading) {
            setDataModel(service);
        }

        if (
            dataModel.name !== activeServiceRoute.title &&
            dataModel._id !== ""
        ) {
            serviceRoutes[1].title = dataModel.name;
            setServiceRoutes([...serviceRoutes]);
            setActiveServiceRoute(serviceRoutes[1]);
        }

        if (data) {
            alertSuccess("Update Successful!");
        }

        reset();
    }, [data, isLoading]);

    const [dataModel, setDataModel] = useState<Service>({
        _id: "",
        description: "",
        name: "",
        price: "",
    });

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
        updateServiceQuery(dataModel);
        console.log(dataModel);
    };

    return (
        <section className="flex flex-col gap-4 mx-8">
            <section className="grid grid-rows-3 grid-cols-1 p-4 gap-8">
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Name :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="Name"
                        value={dataModel.name}
                        name="name"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Price :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="$"
                        value={dataModel.price}
                        name="price"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Description :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="description"
                        value={dataModel.description}
                        name="description"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <button
                    onClick={onSubmit}
                    className="btn btn-accent justify-self-end"
                >
                    {isPending ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        "Save"
                    )}
                </button>
            </section>
        </section>
    );
};

export default EditService;
