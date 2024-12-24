import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authUser } from "./api";

const Login = () => {
    const [password, setPassword] = useState<string>("");

    const {
        mutate: loginUser,
        data,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: authUser,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            localStorage.setItem("session", JSON.stringify({ loggedIn: true }));
            navigate("/admin/appointments");
        }
    }, [data]);

    //handle submit data
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        loginUser(password);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-base-300 p-4 rounded-box shadow-xl max-w-lg">
                <div className="text-3xl font-semibold m-2 p-4 ">Login</div>
                {isError && (
                    <div className="text-red-500 font-light ml-6">
                        {error.message}
                    </div>
                )}

                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div className="input input-bordered flex items-center gap-2">
                        <p className="max-lg:hidden text-nowrap">Password :</p>
                        <input
                            type="password"
                            className="w-full"
                            placeholder="password"
                            value={password}
                            name="email"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className=" m-2 p-4 ">
                    {isPending ? (
                        <>
                            <button
                                className="btn btn-accent cursor-not-allowed"
                                onClick={handleSubmit}
                            >
                                <span className="loading loading-infinity loading-lg"></span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-accent"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
