import { useEffect, useState } from "react";

interface SlidesProps {
    slides: JSX.Element[];
}
const images = ["b1.jpg", "b2.jpg", "b3.jpg", "b4.jpg", "b5.jpg"];

const Slides = () => {
    let slides = [];
    let texts = generateTexts();
    const [currentSlide, setCurrentSlide] = useState(0);
    for (var i = 0; i < 5; i++) {
        slides.push(
            <div
                className="grid grid-rows-* grid-cols-2 max-md:grid-cols-1 gap-4 flex-shrink-0 flex-grow-0  duration-300 ease-in-out w-full h-full "
                style={{ translate: `${-100 * currentSlide}%` }}
                key={i}
            >
                <img src={images[i]} className=" object-cover w-full h-full " />
                {texts[i]}
            </div>
        );
    }
    const MINUTE_MS = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
            var tmp = currentSlide + 1;
            if (tmp > 4) tmp = 0;
            setCurrentSlide(tmp);
        }, MINUTE_MS);

        return () => clearInterval(interval);
    });

    return (
        <div className="rounded-box  relative">
            <div className="flex overflow-hidden">{slides}</div>

            <button
                className=" absolute  top-0 bottom-0 left-0 stroke-white fill-black p-4  hover:bg-black hover:bg-opacity-20 transition duration-125  & > *:hover:animate-bounce"
                onClick={() => {
                    var tmp = currentSlide;
                    if (currentSlide == 0) tmp = 4;
                    else tmp = currentSlide - 1;
                    setCurrentSlide(tmp);
                }}
            >
                <i className="fas fa-arrow-left"></i>
            </button>
            <button
                className="absolute top-0 bottom-0 right-0 stroke-white fill-black p-4  hover:bg-black hover:bg-opacity-20 transition duration-125 & > *:hover:animate-bounce"
                onClick={() => {
                    var tmp = currentSlide;
                    if (currentSlide == 4) tmp = 0;
                    else tmp = currentSlide + 1;
                    setCurrentSlide(tmp);
                }}
            >
                <i className="fas fa-arrow-right"></i>
            </button>
            <div className=" absolute bottom-0 left-2/4 -translate-x-1/2 tra flex gap-4">
                {images.map((_, index) =>
                    currentSlide == index ? (
                        <i
                            key={index}
                            className="fas fa-dot-circle cursor-pointer hover:-translate-y-0.5 transition"
                            onClick={() => setCurrentSlide(index)}
                        ></i>
                    ) : (
                        <i
                            key={index}
                            className="far fa-circle cursor-pointer hover:-translate-y-0.5 transition"
                            onClick={() => setCurrentSlide(index)}
                        ></i>
                    )
                )}
            </div>
        </div>
    );
};

export default Slides;

const generateTexts = () => {
    return [
        <div>
            <div className="text-2xl font-bold text-nowrap mb-8">
                Who We Are
            </div>
            <div className="font-medium text-xl">
                Who We Are SLiJ Coiffure is the best yet affordable hair salon
                for men and women in downtown Montreal. Our hair salon features
                a contemporary, urban style with a twist. It is a smart choice
                for those who wish to look their best without overpaying. We
                perceive every single haircut or any other hairstyling process
                such as blow-dry, coloration, brushing, or beard trimming as a
                unique masterpiece and a visual manifestation of your unique
                personality. <br></br>At SLiJ Coiffure every hairdresser is an
                experienced, certified, and gifted hairstylist who continuously
                strives to achieve the best possible results. No matter whether
                you wish to look like a glamorous diva, a spoiled hipster, a
                snobby banker, or a ruthless mafioso, you'll be amazed by your
                new haircut and pleasantly surprised with the price tag. Of
                course, there are plenty of affordable and cheap hair salons
                downtown Montreal, but only SLiJ Coiffure provides genuine
                high-end services you will truly enjoy. <br></br>Trust us: our
                quality/price ratio is simply unbeatable within the downtown
                Montreal area. Follow us on your favorite social media site and
                subscribe to our newsletter to catch our crunchy haircut deals!
                We are waiting for you.
            </div>
        </div>,
        <div>
            <div className="text-2xl font-bold text-nowrap mb-8">
                Our Reputation
            </div>
            <div className="font-medium text-xl">
                Got a minute? Take a look at our reviews and read what our
                customers say about our Montreal downtown hair salon and their
                personal experiences. Most of them love what we do. Feel free to
                write your own review as well. By the way... If you google "best
                hair salon near Concordia" you'll find that we are #1 and if you
                google "best hair salon downtown Montreal" you'll see that we
                are on the first page.
            </div>
        </div>,
        <div>
            <div className="text-2xl font-bold text-nowrap mb-8">
                Hairstyling We Do
            </div>
            <div className="font-medium text-xl">
                When you come to our Montreal hair salon, you don't just come to
                cut your hair or trim your beard... you come to refine your
                personality. We want you to walk out of our hair salon with a
                big smile on your beautiful face and we want you to come back
                again and again. We primarily specialize in haircuts and
                hairstyling for men however we also do superior quality
                haircuts, highlights, balayage, ombré, as well as full and
                partial hair coloration for ladies. We believe that we are the
                best hair salon in downtown Montreal as we offer our customers
                excellent quality, personalized approach, convenient location,
                student-friendly prices, relaxed atmosphere, and... a cup of
                green tea or coffee. People love us because whoever visits us
                for the first time becomes our loyal customer for years. We are
                proud that SLiJ Coiffure was rated the best hair salon for
                students in 2014 and in 2015 among Concordia students. If you
                feel that it is time for you to cut your hair, trim your beard,
                make cool highlights, completely change the color of your hair,
                or even prepare for a wedding, graduation, job interview, or
                another important event where you must look your best, we will
                be more than happy to see you at our downtown hair salon. Don't
                forget, if you are going out, we can just do quick styling
                and/or blowdry for you. Call us at 514.652.7477, book your
                appointment online or simply come over.
            </div>
        </div>,
        <div>
            <div className="text-2xl font-bold text-nowrap mb-8">
                Downtown Convenience
            </div>
            <div className="font-medium text-xl">
                Our affordable hair salon is conveniently located in the heart
                of Downtown Montreal, near Concordia University and bus stop
                165. It is literally a one-minute walking distance from Guy
                Concordia metro station (St. Mathieu exit). John Molson School
                of Business is actually just around the corner. SLiJ Coiffure is
                very close to Lasalle College and Dawson College. It is also not
                too far from McGill University. Unlike every second cheap
                Montreal hair salon, our hair salon is open on Saturday. Guess
                what! We are also open on Sunday. Moreover, if you desperately
                need to get your haircut done right away, we can even stay
                longer... just let us know in advance. Your satisfaction is very
                important for us because we want you to come back and to
                recommend us to your friends, co-workers, and family.
            </div>
        </div>,
        <div>
            <div className="text-2xl font-bold text-nowrap mb-8">
                Our Products
            </div>
            <div className="font-medium text-xl">
                We sell a variety of quality hair care and hairstyling products.
                Ask us for details when you visit SLiJ Coiffure. We can also
                suggest products and treatments that best fit your type of hair
                and lifestyle. You can purchase: <br></br>REDKEN hair products
                for men
                <br></br>WAHL trimmers (not available in stores and pharmacies)
                <br></br>Various hair treatments, hair masks, and hair oils
            </div>
        </div>,
    ];
};
