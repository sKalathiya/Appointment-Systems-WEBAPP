const Contact = () => {
    return (
        <section className="flex flex-col gap-8 items-center">
            <div className="h1 text-4xl font-medium">Are you Ready to Book</div>
            <ul>
                <li className="phone ">
                    <center>
                        Call us today. You can leave us a message and we will
                        get back to you shortly.
                    </center>
                    <center className="m-2 text-3xl">
                        <i className="fas fa-phone mr-2"></i>
                        514 652 7477
                    </center>
                </li>
                <div className="divider"></div>
                <li className="person ">
                    <center>
                        You can also simply come to our hair salon without
                        calling or reserving your spot online. <br></br> If you
                        do so, you will most likely have to wait. Waiting time
                        may vary depending on the day and time.
                    </center>
                    <center className="m-2 text-2xl">
                        <i className="fas fa-subway m-2"></i>
                        GUY CONCORDIA (EXIT: ST MATHIEU) <br></br>
                        <b>2285 St Mathieu, Montreal, H3H 2J7</b>
                    </center>
                </li>
                <div className="divider"></div>
                <li className="online ">
                    <center>
                        Booking online is easy and convenient. When we receive
                        your request we will email, text or call you back to
                        confirm.<br></br> Please make sure you arrive at least 5
                        minutes before the time of your appointment.<br></br> If
                        you are more than 10 minutes late, your reservation may
                        become void. If you need to cancel or change your visit,
                        please do so in advance.
                    </center>
                    <center className="m-2 text-2xl">
                        <a
                            className="btn btn-accent w-32 & > *:hover:translate-x-2  h-14"
                            href={"#Book"}
                        >
                            {" "}
                            Book Now
                            <i className="fas fa-arrow-right transition duration-300"></i>
                        </a>
                    </center>
                </li>
            </ul>
        </section>
    );
};

export default Contact;
