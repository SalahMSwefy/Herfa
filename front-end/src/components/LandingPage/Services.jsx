import { BriefcaseBusiness, MessageSquare, Search, Users } from 'lucide-react'

let iconStyle =
    'mb-6 text-main-600 shadow-main-900 drop-shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-125 group-hover:drop-shadow-lg'

let services = [
    {
        icon: <Users size={80} className={iconStyle} />,
        title: 'Connect Easily',
        paragraph:
            'Our platform helps workers and customers connect effortlessly.',
    },
    {
        icon: <Search size={80} className={iconStyle} />,
        title: 'Find Suitable Workers',
        paragraph:
            'Customers can easily find workers that meet their specific needs.',
    },
    {
        icon: <BriefcaseBusiness size={80} className={iconStyle} />,
        title: 'Showcase Your Work',
        paragraph:
            'Workers can display their projects and skills on our platform.',
    },
    {
        icon: <MessageSquare size={80} className={iconStyle} />,
        title: 'Efficient Communication',
        paragraph:
            'Ensuring smooth and effective communication between workers and customers.',
    },
]

function Services() {
    return (
        <div
            className="flex min-h-[90hv] items-center justify-center overflow-hidden bg-gradient-to-br from-white to-stone-100 px-4 py-10 lg:p-20"
            id="services"
        >
            <div className="relative max-w-[1200px]">
                <h2 className="mb-8 bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-center font-brand text-3xl uppercase tracking-wide text-main-500 md:text-5xl lg:mb-16">
                    At Your Service
                </h2>
                <div className="grid max-w-[1000px] grid-cols-1 gap-10 p-5 lg:grid-cols-2">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/30 bg-white/80 p-10 text-center shadow-lg transition-all"
                        >
                            <div className="absolute inset-0 z-0 translate-y-full transform bg-gradient-to-br from-orange-600/10 to-orange-500/10 transition-transform duration-500 ease-in-out group-hover:translate-y-0"></div>
                            {service.icon}
                            <h3 className="mb-4 text-xl font-bold tracking-normal text-stone-800 hover:text-stone-900">
                                {service.title}
                            </h3>
                            <p className="text-sm font-light text-stone-500 group-hover:text-stone-800 md:text-base">
                                {service.paragraph}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services
