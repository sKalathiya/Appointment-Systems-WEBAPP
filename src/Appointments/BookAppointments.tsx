import { FormEvent, useEffect, useState } from "react";
import Slots from "./Slots";
import UserDetail from "./UserDetail";
import { IAppointmentPost } from "../HELPERS/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAppointment } from "./api";
import { alertSuccess } from "../HELPERS/Alert";

const BookAppointments = () => {
    const [dataModel, setDataModel] = useState<IAppointmentPost>({
        worker: "",
        service: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    const queryClient = useQueryClient();

    const {
        data,
        reset,
        isPending,
        isError,
        error,
        mutate: addAppointmentQuery,
    } = useMutation({
        mutationFn: (data: string) => addAppointment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointemnts"] });
        },
    });

    useEffect(() => {
        if (data) {
            alertSuccess("Appointment Booked Successfully!");
        }
        reset();
        setDataModel({
            worker: "",
            service: "",
            userName: "",
            userEmail: "",
            userPhone: "",
            date: "",
            startTime: "",
            endTime: "",
        });
    }, [data]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        addAppointmentQuery(JSON.stringify(dataModel));
        console.log(dataModel);
    };

    return (
        <div className="flex flex-col gap-4">
            {isError && (
                <center className="text-red-500 font-light">
                    Something went wrong! please try again!
                </center>
            )}
            <UserDetail setDataModel={setDataModel} dataModel={dataModel} />
            <div className="divider"></div>
            <Slots setDataModel={setDataModel} dataModel={dataModel} />
            <div className="divider"></div>
            <button onClick={onSubmit} className="btn btn-accent self-end">
                {isPending ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : (
                    "Book it"
                )}
            </button>
        </div>
    );
};

export default BookAppointments;
