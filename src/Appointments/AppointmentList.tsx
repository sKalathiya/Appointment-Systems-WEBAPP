import { useState } from "react";
import { Appointment } from "../HELPERS/types";
import { getStringFromDate } from "./api";
import EditAppointmentStatus from "./EditAppointmentStatus";

interface AppointmentListProps {
    appointments: Appointment[];
    from: string;
    to: string;
}

const AppointmentList = ({ appointments, from, to }: AppointmentListProps) => {
    let currentDate = new Date(from);
    const endDate = new Date(to);
    let dateRange = [];
    let map = new Map<String, Appointment[]>();

    const [selectedDate, setSelectedDate] = useState<String>(
        currentDate.toDateString()
    );
    while (currentDate <= endDate) {
        map.set(
            currentDate.toDateString(),
            appointments.filter(
                (app) =>
                    app.date.toString().split("T")[0] ==
                    getStringFromDate(currentDate)
            )
        );

        dateRange.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <div className="flex flex-col gap-4">
            {dateRange.map((date) => {
                return (
                    <div key={date}>
                        <div className="w-full bg-base-300 p-4 rounded-box">
                            {selectedDate == date ? (
                                <i
                                    className="fas fa-chevron-down mr-2 cursor-pointer"
                                    onClick={() => setSelectedDate("")}
                                ></i>
                            ) : (
                                <i
                                    className="fas fa-chevron-right mr-2 cursor-pointer"
                                    onClick={() => setSelectedDate(date)}
                                ></i>
                            )}

                            {date}
                        </div>

                        {selectedDate == date &&
                            (map.get(selectedDate)?.length == 0 ? (
                                <center className="mt-2 rounded-box border border-gray-500 p-4">
                                    <i className="fas fa-exclamation mr-2"></i>
                                    No appointments for this day!
                                </center>
                            ) : (
                                map.get(selectedDate)?.map((app) => {
                                    return (
                                        <div
                                            key={app._id}
                                            className="grid grid-rows-3 grid-cols-4 max-md:grid-rows-5 max-md:grid-cols-2 gap-4 rounded-box border border-gray-500 mt-2 p-4"
                                        >
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Client Name
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.userName}
                                                >
                                                    {app.userName}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Client Email
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.userEmail}
                                                >
                                                    {app.userEmail}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Client Phone
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.userPhone}
                                                >
                                                    {app.userPhone}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Assigned To
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={
                                                        app.worker?.firstName ||
                                                        "Worker Removed"
                                                    }
                                                >
                                                    {app.worker?.firstName ||
                                                        "Worker Removed"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Start Time
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.startTime}
                                                >
                                                    {app.startTime}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    End Time
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.endTime}
                                                >
                                                    {app.endTime}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-gray-400 font-medium">
                                                    Service
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={
                                                        app.service?.name ||
                                                        "Service Removed"
                                                    }
                                                >
                                                    {app.service?.name ||
                                                        "Service Removed"}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Price
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={
                                                        app.service?.price ||
                                                        "Service Removed"
                                                    }
                                                >
                                                    {"$ " +
                                                        (app.service?.price ||
                                                            "Service Removed")}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Paid
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.paid}
                                                >
                                                    {"$ " + app.paid}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 font-medium">
                                                    Tip
                                                </label>
                                                <p
                                                    className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                    title={app.tip}
                                                >
                                                    {"$ " + app.tip}
                                                </p>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <p
                                                    className="font-bold badge badge-accent p-4"
                                                    title={app.status}
                                                >
                                                    {app.status}
                                                </p>
                                                {app.status == "Booked" && (
                                                    <EditAppointmentStatus
                                                        appointmentId={app._id}
                                                        from={from}
                                                        to={to}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ))}
                    </div>
                );
            })}
        </div>
    );
};

export default AppointmentList;
