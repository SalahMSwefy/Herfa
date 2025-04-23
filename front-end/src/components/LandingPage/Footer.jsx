function Footer() {
    return (
        <div>
            <footer className="h-auto w-full py-5 text-center">
                <div className="mb-5 flex items-center justify-center gap-5">
                    <h2 className="font-brand text-4xl font-bold text-main-600 lg:text-5xl">
                        7erfa
                    </h2>
                    <p className="border-l border-black pl-5 font-brand text-xl font-normal lg:text-2xl">
                        save your time
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 p-5 md:flex-row md:justify-between">
                    <div className="flex items-center justify-center gap-5">
                        <a
                            href="#"
                            className="border-r border-black pr-5 text-lg font-medium text-black hover:text-main-600"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-lg font-medium text-black hover:text-main-600"
                        >
                            Terms of Service
                        </a>
                    </div>
                    <p className="order-first text-center text-base font-medium text-black md:order-none lg:text-lg">
                        <strong className="font-brand font-bold text-main-600">
                            7erfa Platform
                        </strong>{' '}
                        © 2024 All rights reserved
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
