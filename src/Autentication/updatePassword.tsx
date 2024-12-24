import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { alertSuccess } from "../HELPERS/Alert";
import Model from "../HELPERS/Model";
import { updateAuth } from "./api";

export interface UpdateAuth {
    password: string;
    confirmPassword: string;
    newPassword: string;
}

const UpdatePassword = () => {
    const [toggleModal, setToggleModal] = useState(false);
    const [inputError, setInputError] = useState("");
    const [auth, setAuth] = useState<UpdateAuth>({
        newPassword: "",
        confirmPassword: "",
        password: "",
    });

    const {
        mutate: UpdatePassword,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: updateAuth,
    });

    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setAuth({ newPassword: "", confirmPassword: "", password: "" });
        }

        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("Password Updated Successfully!");
        }
        reset();
    }, [data, toggleModal]);

    //handle submit data
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (auth.newPassword != auth.confirmPassword) {
            setInputError("New Password does not match!");
        } else {
            UpdatePassword({
                password: auth.password,
                newPassword: auth.newPassword,
            });
        }
        setInputError("");
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuth((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <>
            <div
                className="btn bg-base-300"
                onClick={() => setToggleModal(!toggleModal)}
            >
                Update Password
            </div>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={handleSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div className=" flex flex-col justify-between gap-8 flex-initial">
                    <div className="text-3xl font-semibold">
                        Update Password
                    </div>
                    {(isError || inputError != "") && (
                        <div className="text-red-500 font-light">
                            {(error ? error.message : "") + inputError}
                        </div>
                    )}
                    <div className="input input-bordered flex items-center gap-2">
                        <p className="max-lg:hidden text-nowrap">Password :</p>
                        <input
                            type="password"
                            className="w-full"
                            placeholder="Password"
                            value={auth.password}
                            name="password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="input input-bordered flex items-center gap-2">
                        <p className="max-lg:hidden text-nowrap">
                            New Password :
                        </p>
                        <input
                            type="password"
                            className="w-full"
                            placeholder="New Password"
                            value={auth.newPassword}
                            name="newPassword"
                            onChange={onChange}
                        />
                    </div>
                    <div className="input input-bordered flex items-center gap-2">
                        <p className="max-lg:hidden text-nowrap">
                            Confirm Password :
                        </p>
                        <input
                            type="password"
                            className="w-full"
                            placeholder="Confirm Password"
                            value={auth.confirmPassword}
                            name="confirmPassword"
                            onChange={onChange}
                        />
                    </div>
                </div>
            </Model>
        </>
    );
};

export default UpdatePassword;
