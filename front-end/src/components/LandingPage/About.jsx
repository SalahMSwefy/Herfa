function About() {
    return (
        <div
            className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-main-600 to-main-500 p-4 text-center text-white md:p-10 lg:p-20"
            id="about"
        >
            <div className="bg-gradient-radial absolute inset-0 z-10 from-transparent to-black/15"></div>
            <div className="relative z-20 m-0 max-w-[900px] animate-[fade-in_1.5s_ease-out,float_6s_infinite] ease-in-out">
                <h2 className="mb-8 animate-[slide-in-top_1s_ease-out_both,glow_3s_infinite] bg-gradient-to-r from-white to-main-50 bg-clip-text font-brand text-3xl uppercase tracking-wide ease-in-out lg:text-5xl">
                    About Us
                </h2>
                <p className="mb-10 animate-[slide-in-left_1.5s_ease-out_both] text-base font-light text-main-50 md:text-lg">
                    At{' '}
                    <span className="animate-pop relative inline-block font-semibold text-white transition hover:scale-110">
                        7erfa
                    </span>{' '}
                    , we aim to bridge the gap between customers and skilled
                    workers. Our platform ensures a seamless connection that
                    saves time, enhances reliability, and drives satisfaction.
                    Whether you&apos;re a customer looking for assistance or a
                    worker seeking opportunities,{' '}
                    <span className="animate-pop relative inline-block font-semibold text-white transition hover:scale-110">
                        7erfa
                    </span>{' '}
                    has you covered.
                </p>
                <button className="group transform rounded-full border-2 border-white bg-white px-4 py-2 text-base font-semibold shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-transparent hover:text-white hover:shadow-lg md:px-9 md:py-4 md:text-lg">
                    <a
                        href="#services"
                        className="uppercase text-main-500 no-underline group-hover:text-white"
                    >
                        Learn More
                    </a>
                </button>
            </div>
        </div>
    )
}

export default About
