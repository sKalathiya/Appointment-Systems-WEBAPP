import { useEffect, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutAuth } from "./api";

const Logout = () => {
    const {
        mutate: logout,
        data,
        isPending,
        reset,
    } = useMutation({
        mutationFn: logoutAuth,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            localStorage.removeItem("session");
            navigate("/admin/auth/login");
        }
        reset();
    }, [data]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        logout();
    };
    return (
        <>
            {isPending ? (
                <div
                    className=" btn cursor-not-allowed  ml-2 bg-base-300"
                    onClick={handleSubmit}
                >
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
                <div className="btn  ml-2 bg-base-300" onClick={handleSubmit}>
                    Sign out
                </div>
            )}
        </>
    );
};

export default Logout;
