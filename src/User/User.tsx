import Navbar from "./Navbar";
import BookAppointments from "../Appointments/BookAppointments";

import Contact from "./Contact";
import Slides from "./Slides";
import Home from "./Home";

import Career from "./Career";
import { Notification } from "../HELPERS/Alert";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <Notification />
            <section className="flex flex-col gap-8 max-w-full overflow-x-hidden">
                <Navbar />
                <Home />
                <section
                    className="mx-8 shadow-md rounded-box bg-base-200 p-8 scroll-mt-4"
                    id="About"
                >
                    <Slides />
                </section>
                <section
                    className="mx-8 shadow-md rounded-box bg-base-200 p-8 scroll-mt-4"
                    id="Book"
                >
                    <div className="text-2xl font-bold text-nowrap mb-8">
                        Book Appointment
                    </div>
                    <BookAppointments />
                </section>

                <section
                    className="mx-8 shadow-md rounded-box bg-base-200 p-8 scroll-mt-4"
                    id="Contact"
                >
                    <Contact />
                </section>

                <section
                    className="mx-8 shadow-md rounded-box bg-base-200 p-8 mb-8 scroll-mt-4"
                    id="Career"
                >
                    <Career />
                </section>
                <button
                    className={
                        "btn btn-accent fixed bottom-0 right-0 z-10 m-4 bg-opacity-50 border-opacity-50 rounded-full  "
                    }
                    onClick={scrollToTop}
                >
                    <i className="fas fa-arrow-up"></i>
                </button>
            </section>
        </>
    );
};

export default User;
