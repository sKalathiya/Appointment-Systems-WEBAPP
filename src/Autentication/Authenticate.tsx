import { useNavigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";

const Authenticate = ({ children }: { children: ReactNode }) => {
    const sessionJson = localStorage.getItem("session");
    const [isTrue, setIsTrue] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionJson) {
            navigate("/admin/auth/login");
        } else {
            if (JSON.parse(sessionJson).loggedIn) {
                setIsTrue(true);
            }
        }
    }, [sessionJson]);
    if (isTrue) return children;
};

export default Authenticate;
