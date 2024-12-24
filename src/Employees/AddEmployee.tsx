import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MultipleSelect from "./MultipleSelect";
import { Service, IEmployeePost } from "../HELPERS/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "./api";
import { alertSuccess } from "../HELPERS/Alert";

const steps = ["Details", "Services", "Schedule"];
const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const emptyModel: IEmployeePost = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    schedule: [],
    services: [],
};

for (let i = 0; i < 7; i++) {
    emptyModel.schedule.push({
        hours: "",
        startTime: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        }),
        endTime: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        }),
    });
}

export default function AddEmployee() {
    const [activeStep, setActiveStep] = useState(0);
    const [dataModel, setDataModel] = useState<IEmployeePost>(emptyModel);
    const [serviceList, setServiceList] = useState<Service[]>([]);
    const queryClient = useQueryClient();

    const {
        mutate: addWorkerQuery,
        isPending,
        data,
        reset,
    } = useMutation({
        mutationFn: (data: string) => addEmployee(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
        },
    });

    useEffect(() => {
        if (data) {
            alertSuccess("Employee Added Successfully!");
        }
        reset();
        setDataModel(emptyModel);
        setServiceList([]);
        setActiveStep(0);
    }, [data]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var hasNumber = /\d/;
        if (hasNumber.test(name)) {
            const index = parseInt(name.substring(0, 1));
            const field = name.substring(1);
            const tmp = dataModel.schedule;
            tmp[index] = { ...tmp[index], [field]: value };
            setDataModel({ ...dataModel, schedule: tmp });
        } else {
            setDataModel({ ...dataModel, [name]: value });
        }

        console.log(dataModel);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        serviceList.forEach((service) => dataModel.services.push(service._id));
        addWorkerQuery(JSON.stringify(dataModel));
        console.log(dataModel);
    };

    return (
        <section className="flex flex-col gap-4 mx-8">
            <section className="flex flex-row justify-center items-center p-4">
                {steps.map((step, index) => (
                    <>
                        <div
                            className="flex flex-row items-center gap-2 hover:cursor-pointer"
                            onClick={() => setActiveStep(index)}
                        >
                            <i
                                className={
                                    "fas  fa-sm " +
                                    (activeStep >= index
                                        ? "fa-check-circle text-accent"
                                        : "fa-circle")
                                }
                            ></i>
                            {step}
                        </div>
                        {index != steps.length - 1 && (
                            <hr className=" w-full border-t-gray-600 mx-4 min-w-1" />
                        )}
                    </>
                ))}
            </section>

            <section>
                {/* Details */}
                {activeStep == 0 && (
                    <section className="grid grid-rows-2 grid-cols-2 p-4 gap-8 max-lg:grid-rows-4 max-lg:grid-cols-1">
                        <div className="input input-bordered flex items-center gap-2">
                            <p className="max-lg:hidden text-nowrap">
                                First Name :
                            </p>
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
                            <p className="max-lg:hidden text-nowrap">
                                Last Name :
                            </p>
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
                                placeholder="me@site.com"
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
                )}

                {/* Services */}
                {activeStep == 1 && (
                    <section className="p-4">
                        <MultipleSelect
                            label="Services"
                            items={serviceList}
                            setItems={setServiceList}
                        />
                    </section>
                )}

                {/* Schedule */}
                {activeStep == 2 && (
                    <section className="p-4 flex flex-col gap-4">
                        {week.map((day, index) => (
                            <div
                                className="card bg-base-300 shadow-md"
                                key={index}
                            >
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
                                                value={
                                                    dataModel.schedule[index]
                                                        .hours
                                                }
                                                onChange={(e) => onChange(e)}
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
                                                value={dataModel.schedule[
                                                    index
                                                ].startTime.toString()}
                                                onChange={(e) => onChange(e)}
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
                                                value={dataModel.schedule[
                                                    index
                                                ].endTime.toString()}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </section>

            <section className="flex flex-row justify-between">
                <button
                    disabled={activeStep === 0 || isPending}
                    onClick={handleBack}
                    className="mr-1 btn btn-accent"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>

                {activeStep === steps.length - 1 ? (
                    <button onClick={onSubmit} className="btn btn-accent">
                        {isPending ? (
                            <span className="loading loading-infinity loading-lg"></span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                ) : (
                    <button onClick={handleNext} className="btn btn-accent">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                )}
            </section>
        </section>
    );
}
