import { useQuery } from "@tanstack/react-query";
import { getServices } from "./api";
import { Service } from "../HELPERS/types";

interface ListServiceProps {
    addRoute: (type: string, title: string, title_id: string) => void;
}

const ListService = ({ addRoute }: ListServiceProps) => {
    const {
        data: services,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getServices(),
        queryKey: ["services"],
    });

    console.log(services);

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
                <section className="grid grid-rows-* grid-cols-3 max-lg:grid-cols-1 gap-4">
                    {services.map((service: Service) => (
                        <div
                            className="card bg-base-300 shadow-lg"
                            key={service._id}
                        >
                            <div className="card-body gap-4">
                                <div className="grid grid-rows-2 grid-cols-5 gap-4 ">
                                    <div className="col-span-3">
                                        <label className="text-gray-400 font-medium">
                                            Name
                                        </label>
                                        <p
                                            className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={service.name}
                                        >
                                            {service.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 font-medium">
                                            Price
                                        </label>
                                        <p className="font-medium">
                                            {"$ " + service.price}
                                        </p>
                                    </div>
                                    <div className="justify-self-end flex flex-row">
                                        <i
                                            onClick={() =>
                                                addRoute(
                                                    "Edit",
                                                    service.name,
                                                    service._id
                                                )
                                            }
                                            className="fas fa-pen cursor-pointer"
                                            title="Edit"
                                        ></i>
                                    </div>
                                    <div className="col-span-4">
                                        <label className="text-gray-400 font-medium">
                                            Description
                                        </label>
                                        <p
                                            className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={service.description}
                                        >
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="justify-self-end flex flex-row gap-4">
                                        <button
                                            className="btn btn-error "
                                            onClick={() =>
                                                addRoute(
                                                    "Delete",
                                                    service.name,
                                                    service._id
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ListService;
