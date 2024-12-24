import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IEmployeePost, Shift } from "../HELPERS/types";
import { getEmployee, updateEmployee, updateSchedule } from "./api";
import { RoutesContext } from "../HELPERS/States";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { alertSuccess } from "../HELPERS/Alert";

interface EditScheduleProps {
    id: string;
}

const EditSchedule = ({ id }: EditScheduleProps) => {
    const week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const { data: employee, isLoading } = useQuery({
        queryFn: () => getEmployee(id),
        queryKey: ["Employee", id],
    });

    const queryClient = useQueryClient();

    const {
        mutate: updateScheduleQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: (data: Shift[]) => updateSchedule(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Employee", id],
            });
        },
    });

    useEffect(() => {
        if (dataModel.length == 0 && !isLoading) {
            setDataModel([...employee.schedule]);
        }
        if (data) {
            alertSuccess("Update Successful!");
        }
        reset();
    }, [data, isLoading]);

    const [dataModel, setDataModel] = useState<Shift[]>([]);

    if (isLoading) {
        return (
            <center>
                <span className="loading loading-infinity loading-lg"></span>
            </center>
        );
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const index = parseInt(name.substring(0, 1));
        const field = name.substring(1);
        const tmp = dataModel;
        tmp[index] = { ...tmp[index], [field]: value };
        setDataModel([...tmp]);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        updateScheduleQuery(dataModel);
    };

    console.log(dataModel);
    return (
        <section className="flex flex-col gap-4 mx-8">
            <section className="p-4 flex flex-col gap-4">
                {week.map((day, index) => (
                    <div className="card bg-base-300 shadow-md" key={index}>
                        <div className="card-body gap-4">
                            <p>{day}</p>

                            <div className="grid grid-rows-1 grid-cols-3 max-lg:grid-rows-3 max-lg:grid-cols-1 gap-4">
                                <div className="input input-bordered flex items-center gap-2">
                                    <p className="max-lg:hidden text-nowrap">
                                        Hours :
                                    </p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        placeholder="hours"
                                        name={index + "hours"}
                                        value={dataModel[index]?.hours || ""}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="input input-bordered flex items-center gap-2">
                                    <p className="max-lg:hidden text-nowrap">
                                        Start Time :
                                    </p>
                                    <input
                                        type="time"
                                        className="w-full"
                                        name={index + "startTime"}
                                        value={
                                            dataModel[
                                                index
                                            ]?.startTime.toString() || ""
                                        }
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="input input-bordered flex items-center gap-2">
                                    <p className="max-lg:hidden text-nowrap">
                                        End Time :
                                    </p>
                                    <input
                                        type="time"
                                        className="w-full"
                                        placeholder="hours"
                                        name={index + "endTime"}
                                        value={
                                            dataModel[
                                                index
                                            ]?.endTime.toString() || ""
                                        }
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    onClick={onSubmit}
                    className="btn btn-accent self-end mx-4"
                >
                    {isPending ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        "Update"
                    )}
                </button>
            </section>
        </section>
    );
};

export default EditSchedule;
