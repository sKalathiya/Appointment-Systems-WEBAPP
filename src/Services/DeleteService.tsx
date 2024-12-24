import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "./api";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RoutesContext } from "../HELPERS/States";
import { alertSuccess } from "../HELPERS/Alert";

interface DeleteServiceProps {
    id: string;
    homeRoute: () => void;
}

const DeleteService = ({ id, homeRoute }: DeleteServiceProps) => {
    const { activeRoute: activeServiceRoute } = useContext(RoutesContext);
    const queryClient = useQueryClient();

    const {
        mutate: deleteServiceQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: () => deleteService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["service", id],
            });
        },
    });

    const [service, setService] = useState<string>("");
    const [inputError, setInputError] = useState<string>("");

    useEffect(() => {
        if (data) {
            homeRoute();
            alertSuccess("Delete Successful!");
            setInputError("");
            setService("");
            reset();
        }
    }, [data]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (service != activeServiceRoute.title) {
            setInputError("service title does not match!");
            return;
        }
        deleteServiceQuery();
    };
    return (
        <section className="flex flex-col gap-4 mx-8">
            <section className="grid grid-rows-2 grid-cols-1 p-4 gap-4 self-center items-center">
                <p>
                    Please enter{" "}
                    <div className="font-medium badge badge-error badge-outline p-3">
                        {activeServiceRoute.title}
                    </div>{" "}
                    for it to be deleted.
                </p>
                {inputError && <p className=" text-error">{inputError}</p>}
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">Service :</p>
                    <input
                        type="text"
                        className="w-full"
                        placeholder="service"
                        value={service}
                        name="name"
                        onChange={(e) => setService(e.target.value)}
                    />
                </div>

                <button
                    onClick={onSubmit}
                    className="btn btn-error justify-self-end"
                >
                    {isPending ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        "Delete"
                    )}
                </button>
            </section>
        </section>
    );
};

export default DeleteService;
