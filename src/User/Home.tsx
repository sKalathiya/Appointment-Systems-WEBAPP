const Home = () => {
    const detail = (
        <div className="font-medium max-w-xl m-9 text-xl">
            Salon de Coiffure SLiJ is the best yet affordable hair salon
            downtown Montreal for men and women. Our hair salon is located near
            Concordia University and Guy Concordia metro station. <br />
            Unlike many cheap downtown hair salons, we offer unbeatable
            quality/price ratio. Our downtown hair salon is also open late,
            including Saturday and Sunday. Our experienced Montreal barbers and
            hairdressers know everything about hairstyling. <br />
            If you need quality & trendy haircut, beard trimming, blow-dry,
            balayage, or highlights at an affordable price, book your
            appointment today. Take advantage of our Montreal haircut student
            specials and join our mailing list for other haircut deals! Scroll
            down to book online.
        </div>
    );

    return (
        <section
            id="Home"
            className="bg-base-200 rounded-box scroll-mt-4 mx-8 p-8 "
        >
            <div className="grid grid-rows-* grid-cols-2 max-md:grid-cols-1 gap-8 place-items-center">
                <div className="bg-white rounded-box">
                    <img
                        src="logo.svg"
                        className="object-contain  hover:scale-125 transition duration-300"
                    />
                </div>

                {detail}
                <a
                    className="btn btn-accent self-start & > *:hover:translate-x-2  h-14"
                    href={"#Book"}
                >
                    {" "}
                    Book Now
                    <i className="fas fa-arrow-right transition duration-300"></i>
                </a>
            </div>
        </section>
    );
};

export default Home;
