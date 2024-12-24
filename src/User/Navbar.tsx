import { useEffect, useState } from "react";

const Navbar = () => {
    const tabs = ["Home", "About", "Book", "Contact", "Career"];
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    return (
        <section className="bg-base-200 p-3 shadow-md rounded-box mx-2 top-0 z-10 w-full">
            <div className="navbar">
                <div className="text-2xl font-bold navbar-start text-nowrap">
                    Salon
                </div>
                <div className=" navbar-center flex flex-row gap-4 ">
                    {tabs.map((t) => {
                        return (
                            <a
                                className={
                                    "p-2 hover:cursor-pointer hover:rounded-box  hover:underline underline-offset-8 hover:text-accent font-bold "
                                }
                                key={t}
                                href={"#" + t}
                            >
                                {t}
                            </a>
                        );
                    })}
                </div>
                <div className="navbar-end">
                    {theme == "light" ? (
                        <div
                            className="btn"
                            onClick={() => setTheme("dracula")}
                        >
                            <i className="fas fa-moon"></i>
                        </div>
                    ) : (
                        <div className="btn" onClick={() => setTheme("light")}>
                            <i className="fas fa-sun"></i>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
