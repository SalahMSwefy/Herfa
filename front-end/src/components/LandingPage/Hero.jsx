function Hero() {
    return (
        <div
            className="relative flex h-screen flex-col items-center justify-center gap-4 bg-[url('/hero.jpg')] bg-cover bg-top text-center text-white"
            id="hero"
        >
            <div className="absolute inset-0 bg-[rgba(63,34,5,0.5)]"></div>
            <h1 className="relative z-10 animate-focus-in-expand font-brand text-7xl md:text-9xl lg:text-[11rem]">
                7erfa
            </h1>
            <p className="relative z-10 text-lg font-light md:text-xl lg:text-2xl">
                Connecting customers with the right workers seamlessly and
                efficiently.
            </p>
            <button
                className="relative z-10 mt-10 rounded-full bg-main-600 px-8 py-4 text-sm font-bold uppercase text-white transition hover:scale-105 hover:bg-white hover:text-main-600"
                name="find-more"
            >
                <a href="#about" className="text-inherit no-underline">
                    Find out more
                </a>
            </button>
        </div>
    )
}

export default Hero
