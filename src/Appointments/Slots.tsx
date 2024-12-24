import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmployees } from "../Employees/api";
import { getServices } from "../Services/api";
import { Employee, IAppointmentPost, Service, Slot } from "../HELPERS/types";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { getSlots, getStringFromDate } from "./api";

export interface slotSearch {
    worker: string;
    service: string;
    date: string;
}

interface SlotsProps {
    setDataModel: Dispatch<SetStateAction<IAppointmentPost>>;
    dataModel: IAppointmentPost;
}

const Slots = ({ setDataModel, dataModel }: SlotsProps) => {
    const [search, setSearch] = useState<slotSearch>({
        worker: "-1",
        service: "-1",
        date: getStringFromDate(new Date()),
    });
    const [searchError, setSearchError] = useState<String>("");
    const [selectedSlot, setSelectedSlot] = useState<string>("");

    const {
        data: employees,
        isLoading: isEmployeesLoading,
        isError: isEmployeeError,
    } = useQuery({
        queryFn: () => getEmployees(),
        queryKey: ["employees"],
    });

    const {
        data: services,
        isLoading: isServiceLoading,
        isError: isServiceError,
    } = useQuery({
        queryFn: () => getServices(),
        queryKey: ["services"],
    });

    const {
        data: slots,
        isPending,
        isError,
        mutate: searchSlots,
    } = useMutation({
        mutationFn: getSlots,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (search.service == "-1" || search.worker == "-1") {
            setSearchError("Pls select both service and worker before search!");
        } else {
            setSearchError("");
            searchSlots(search);
        }
    };

    if (isEmployeeError || isServiceError) {
        return (
            <center>
                <span className="text-red-500 font-light">
                    Something went wrong! Please Try again!
                </span>
            </center>
        );
    }
    function selectSlot(slot: Slot): void {
        setDataModel({
            ...dataModel,
            worker: slot.worker,
            service: slot.service,
            startTime: slot.startTime,
            endTime: slot.endTime,
            date: search.date,
        });
        setSelectedSlot(slot.startTime);
    }

    return (
        <section className="flex flex-col gap-4">
            {isEmployeesLoading || isServiceLoading ? (
                <center>
                    <span className="loading loading-infinity loading-lg"></span>
                </center>
            ) : (
                <section className="slots flex flex-col gap-4">
                    <div className="grid grid-rows-1 grid-cols-4 max-lg:grid-rows-4 max-lg:grid-cols-1 gap-4">
                        <div className="input input-bordered flex items-center gap-2">
                            <p className="max-lg:hidden text-nowrap">Date :</p>
                            <input
                                type="date"
                                className="w-full"
                                name="date"
                                value={search.date}
                                min={getStringFromDate(new Date())}
                                onChange={(e) =>
                                    setSearch({
                                        ...search,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <select
                            className="select select-bordered w-full max-w-xs "
                            name="worker"
                            value={search.worker}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    worker: e.target.value,
                                })
                            }
                        >
                            <option value="-1" disabled>
                                Select Employee
                            </option>
                            {employees.map((employee: Employee) => {
                                return (
                                    <option
                                        value={employee._id}
                                        key={employee._id}
                                    >
                                        {employee.firstName}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            className="select select-bordered w-full max-w-xs "
                            name="service"
                            value={search.service}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    service: e.target.value,
                                })
                            }
                        >
                            <option value="-1" disabled>
                                Select Service
                            </option>
                            {services.map((service: Service) => {
                                return (
                                    <option
                                        value={service._id}
                                        key={service._id}
                                    >
                                        {service.name}
                                    </option>
                                );
                            })}
                        </select>

                        <button
                            onClick={onSubmit}
                            className="btn btn-accent self-end"
                        >
                            {isPending ? (
                                <span className="loading loading-infinity loading-lg"></span>
                            ) : (
                                "Find Slots"
                            )}
                        </button>
                    </div>
                    {(isError || searchError != "") && (
                        <center className="text-red-500 font-light">
                            {isError || searchError}
                        </center>
                    )}

                    {slots ? (
                        <div className="grid grid-rows-* grid-cols-8 gap-4 mt-4 max-md:grid-cols-2 max-lg:grid-cols-4 max-xl:grid-cols-6">
                            {slots.map((slot: Slot) => (
                                <div
                                    className={
                                        "rounded-box p-4 flex flex-row gap-2 justify-center cursor-pointer " +
                                        (selectedSlot == slot.startTime
                                            ? "bg-accent text-black"
                                            : "bg-base-300")
                                    }
                                    key={slot.startTime}
                                    onClick={() => selectSlot(slot)}
                                >
                                    <p
                                        className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={
                                            slot.startTime +
                                            " - " +
                                            slot.endTime
                                        }
                                    >
                                        {slot.startTime + " - " + slot.endTime}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="self-center text-grey-500">
                            No slots available!
                        </p>
                    )}
                </section>
            )}
        </section>
    );
};

export default Slots;
