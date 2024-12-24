import { useEffect, useState } from "react";
import { getServices } from "../Services/api";
import { useQuery } from "@tanstack/react-query";
import { Service } from "../HELPERS/types";

interface MultipleSelectProps {
    label: string;
    items: Service[];
    setItems: React.Dispatch<React.SetStateAction<Service[]>>;
}

const MultipleSelect = ({ label, items, setItems }: MultipleSelectProps) => {
    const [searchList, setSearchList] = useState<Service[]>([]);
    const [input, setInput] = useState("");
    const {
        data: services,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getServices(),
        queryKey: ["services"],
    });

    useEffect(() => {
        if (services) setSearchList([...services]);
    }, [services]);

    useEffect(() => {
        if (services)
            setSearchList([
                ...services.filter((tmp: Service) =>
                    tmp.name.toLowerCase().startsWith(input.toLowerCase())
                ),
            ]);
    }, [input]);

    const handleRemove = (i1: Service) => {
        setItems(items.filter((i) => i._id != i1._id));
    };
    return (
        <div className="p-4">
            <div className="dropdown w-full">
                <input
                    className="input input-bordered w-full"
                    tabIndex={0}
                    placeholder={"Select the " + label + "!"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
                >
                    {searchList.map((item) => (
                        <li>
                            <a
                                onClick={() => {
                                    if (
                                        items.find((t) => t._id == item._id) ==
                                        undefined
                                    )
                                        setItems([...items, item]);
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-row gap-2 mt-2 items-center flex-wrap">
                {items.map((item) => {
                    return (
                        <div className="rounded-box text-sm p-3 bg-base-300 flex flex-row items-center">
                            {item.name}
                            <button
                                className="btn btn-xs btn-circle btn-ghost ml-1"
                                onClick={() => handleRemove(item)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultipleSelect;
