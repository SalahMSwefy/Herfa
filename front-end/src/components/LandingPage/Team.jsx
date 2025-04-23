import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const team = [
    {
        name: 'Salah Swefy',
        jobTitle: 'Frontend Developer',
        image: '/team/salah.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100005129460945',
            twitter: 'https://x.com/Salah_Swefy',
            linkedin: 'https://www.linkedin.com/in/salah-swefy-93ab5a265/',
            github: 'https://github.com/SalahMSwefy',
        },
    },
    {
        name: 'Saad samir',
        jobTitle: 'Frontend Developer',
        image: '/team/saad.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100010070029056',
            twitter: 'https://www.linkedin.com/in/saad-samir-b61724296/',
            linkedin: 'https://www.linkedin.com/in/saad-samir-b61724296/',
            github: 'https://github.com/SaadSamir7',
        },
    },
    {
        name: 'Youssef Megahed',
        jobTitle: 'Backend Developer',
        image: '/team/youssef.jpg',
        social: {
            facebook: 'https://www.facebook.com/bor33y?mibextid=ZbWKwL',
            twitter: 'https://x.com/Bor3yLOL',
            linkedin: 'https://www.linkedin.com/in/youssef-megahed',
            github: 'https://github.com/Bor3y9',
        },
    },
    {
        name: 'mohamed khalil',
        jobTitle: 'Backend Developer',
        image: '/team/khalil.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100045007060763',
            twitter: 'https://x.com/Mohamme67235952',
            linkedin: 'https://www.linkedin.com/in/mohammed-khalil-08565321b/',
            github: 'https://github.com/Bigkhil',
        },
    },
]

const socialIcons = [
    {
        platform: 'facebook',
        icon: <FaFacebook size={40} />,
        delay: '100ms',
    },
    {
        platform: 'twitter',
        icon: <FaXTwitter size={40} />,
        delay: '200ms',
    },
    {
        platform: 'linkedin',
        icon: <FaLinkedin size={40} />,
        delay: '300ms',
    },
    {
        platform: 'github',
        icon: <FaGithub size={40} />,
        delay: '400ms',
    },
]

function Team() {
    return (
        <div id="team" className="overflow-hidden bg-stone-100 py-10 lg:p-20">
            <h2 className="mb-8 bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-center font-brand text-3xl uppercase tracking-wide text-main-500 md:text-5xl lg:mb-16">
                Our Team
            </h2>
            <div className="mx-auto my-20 grid grid-cols-1 justify-items-center gap-x-5 gap-y-10 overflow-hidden p-5 md:grid-cols-2 xl:grid-cols-4">
                {team.map((member, index) => (
                    <Member key={index} {...member} />
                ))}
            </div>
        </div>
    )
}

function Member({ name, jobTitle, image, social }) {
    return (
        <div className="group relative aspect-[6/9] w-3/4 min-w-60 overflow-hidden rounded-lg">
            <div className="absolute inset-0 z-[2] h-full w-full bg-main-500/50">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-40"
                />
            </div>
            <ul className="absolute top-1/2 z-10 flex w-full items-center justify-evenly lg:top-2/3">
                {socialIcons.map((icon, i) => (
                    <li key={i}>
                        <a
                            href={social[icon.platform]}
                            key={i + 1}
                            className="relative block translate-y-24 text-stone-500 opacity-0 transition-all hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            {icon.icon}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="absolute -bottom-6 left-0 flex h-20 w-full flex-col items-center justify-center bg-white p-5 transition-all duration-500 group-hover:bottom-0 group-hover:z-30">
                <h2 className="text-center text-xl font-semibold capitalize tracking-wide lg:text-2xl">
                    {name}
                </h2>
                <p className="text-lg text-gray-500">{jobTitle}</p>
            </div>
        </div>
    )
}

export default Team
