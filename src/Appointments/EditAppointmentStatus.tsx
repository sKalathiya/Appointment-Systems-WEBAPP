import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { alertSuccess } from "../HELPERS/Alert";
import Model from "../HELPERS/Model";
import { changeStatus } from "./api";

interface ChangeStatusProps {
    appointmentId: string;
    from: string;
    to: string;
}

const EditAppointmentStatus = ({
    appointmentId,
    from,
    to,
}: ChangeStatusProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const [status, setStatus] = useState("Paid");
    const [values, setValues] = useState({ paid: "0", tip: "0" });
    const queryClient = useQueryClient();

    const {
        data,
        isPending,
        isError,
        error,
        reset,
        mutate: changeStatusOfAppointment,
    } = useMutation({
        mutationFn: () =>
            changeStatus({
                status,
                _id: appointmentId,
                paid: values.paid,
                tip: values.tip,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments", from + " " + to],
            });
        },
    });
    useEffect(() => {
        if (toggleModal) {
            setStatus("Paid");
        }
        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("Status of Appointment updated successfully!");
            reset();
        }
    }, [toggleModal, data]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        changeStatusOfAppointment();
    };

    return (
        <>
            <i
                className="fas fa-pen cursor-pointer"
                onClick={() => setToggleModal(!toggleModal)}
            ></i>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={onSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div className="flex flex-col gap-4 p-2 m-1">
                    <div className="text-3xl font-semibold my-2">Status</div>
                    {isError && (
                        <div className="text-red-500 font-light">
                            {error.message}
                        </div>
                    )}

                    <select
                        className="select select-bordered w-full max-w-xs "
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value={"Paid"}>Paid</option>
                        <option value={"Cancelled"}>Cancelled</option>
                    </select>

                    {status == "Paid" && (
                        <div className="flex flex-row max-lg:flex-col gap-2 max-w-xs">
                            <div className="input input-bordered flex items-center gap-2">
                                <p className="max-lg:hidden text-nowrap">
                                    Paid :
                                </p>
                                <input
                                    type="text"
                                    className="w-full"
                                    placeholder="$"
                                    name="paid"
                                    value={values.paid}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            paid: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <p className="max-lg:hidden text-nowrap">
                                    Tip :
                                </p>
                                <input
                                    type="text"
                                    className="w-full"
                                    placeholder="$"
                                    name="tip"
                                    value={values.tip}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            tip: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Model>
        </>
    );
};

export default EditAppointmentStatus;
