import { Box } from "@mui/material";
import AppointmentList from "./AppointmentList";
import { filterAppointment, getDateFromString, getStringFromDate } from "./api";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";

const AppointmentSearch = () => {
    //getAll Appointments
    const [search, setSearch] = useState({
        from: new Date().toDateString(),
        to: new Date().toDateString(),
        appointments: [],
    });
    const [input, setInput] = useState({ from: "", to: "" });
    const {
        refetch: triggerFilter,
        isLoading,
        data,
        isError,
    } = useQuery({
        queryFn: () =>
            filterAppointment({
                from: getStringFromDate(new Date(search.from)),
                to: getStringFromDate(new Date(search.to)),
            }),
        queryKey: ["appointments", search.from + " " + search.to],
    });

    useEffect(() => {
        if (data) {
            setSearch({
                ...search,
                appointments: data,
            });
        }
    }, [data]);

    useEffect(() => {
        if (search) {
            triggerFilter();
        }
    }, [search.from, search.to]);

    const onSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearch({
            ...search,
            from: getDateFromString(input.from).toDateString(),
            to: getDateFromString(input.to).toDateString(),
        });
    };

    const onClick = (e: FormEvent, type: string) => {
        e.preventDefault();
        var currDate = new Date();
        let from = "";
        let to = "";
        if (type == "today") {
            from = currDate.toDateString();
            to = currDate.toDateString();
        } else if (type == "week") {
            from = new Date(
                currDate.setDate(currDate.getDate() - currDate.getDay())
            ).toDateString();
            to = new Date(
                currDate.setDate(currDate.getDate() - currDate.getDay() + 6)
            ).toDateString();
        } else {
            from = new Date(
                currDate.getFullYear(),
                currDate.getMonth(),
                1
            ).toDateString();

            to = new Date(
                currDate.getFullYear(),
                currDate.getMonth() + 1,
                0
            ).toDateString();
        }
        setSearch({
            ...search,
            from,
            to,
        });
    };

    return (
        <Box className="flex min-lg:flex-row  rounded-box gap-2 max-lg:flex-col">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-start">
                    <a
                        onClick={(e) => onClick(e, "today")}
                        className=" cursor-pointer hover:underline underline-offset-4 text-accent"
                    >
                        Today
                    </a>
                    <a
                        onClick={(e) => onClick(e, "week")}
                        className=" cursor-pointer hover:underline underline-offset-4 text-accent"
                    >
                        This Week
                    </a>
                    <a
                        onClick={(e) => onClick(e, "month")}
                        className=" cursor-pointer hover:underline underline-offset-4 text-accent"
                    >
                        This Month
                    </a>
                </div>

                <div className="divider">OR</div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">From :</p>
                    <input
                        type="date"
                        className="w-full"
                        name="from"
                        value={input.from}
                        onChange={(e) =>
                            setInput({ ...input, from: e.target.value })
                        }
                    />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                    <p className="max-lg:hidden text-nowrap">To :</p>
                    <input
                        type="date"
                        className="w-full"
                        name="to"
                        value={input.to}
                        onChange={(e) =>
                            setInput({ ...input, to: e.target.value })
                        }
                    />
                </div>
                <button className="btn btn-accent" onClick={onSearch}>
                    {isLoading ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        "Search"
                    )}
                </button>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="w-full">
                {isLoading ? (
                    <center>
                        <span className="loading loading-infinity loading-lg"></span>
                    </center>
                ) : isError ? (
                    <center className="text-red-500 text-xl">
                        Something went wrong!
                    </center>
                ) : (
                    <AppointmentList
                        appointments={search.appointments}
                        from={search.from}
                        to={search.to}
                        key={data}
                    />
                )}
            </div>
        </Box>
    );
};

export default AppointmentSearch;
