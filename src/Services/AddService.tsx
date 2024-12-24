import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IServicePost } from "../HELPERS/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addService } from "./api";
import { alertSuccess } from "../HELPERS/Alert";

const emptyModel: IServicePost = {
    name: "",
    price: "",
    description: "",
};

const AddService = () => {
    const [dataModel, setDataModel] = useState<IServicePost>(emptyModel);
    const queryClient = useQueryClient();

    const {
        mutate: addServiceQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: (data: string) => addService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });

    useEffect(() => {
        if (data) {
            alertSuccess("Service Added Successfully!");
        }
        reset();
        setDataModel(emptyModel);
    }, [data]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataModel({ ...dataModel, [name]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        addServiceQuery(JSON.stringify(dataModel));
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
                        "Submit"
                    )}
                </button>
            </section>
        </section>
    );
};

export default AddService;
