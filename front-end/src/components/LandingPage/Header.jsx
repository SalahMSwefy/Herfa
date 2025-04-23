import { useState, useEffect } from 'react'
import { Menu as MenuLogo } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    return (
        <div
            className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-5 transition-all duration-300 ease-in-out lg:justify-around lg:px-0 ${
                isScrolled
                    ? 'bg-gradient-to-br from-main-600 to-main-500 text-white shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <Logo toggleMenu={toggleMenu} />
            <Navbar isMenuOpen={isMenuOpen} />
            <Buttons />
            <div className="lg:hidden">
                <MenuLogo
                    size={32}
                    className={`cursor-pointer text-main-transparent ${
                        isScrolled ? 'text-white' : ''
                    }`}
                    onClick={toggleMenu}
                />
            </div>
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
    )
}

export function Logo({ toggleMenu }) {
    return (
        <div className="flex items-center gap-2 text-main-transparent">
            <img src="/logos/logo.gif" alt="Logo" className="h-14 w-14" />
            <a
                href="#hero"
                className="font-brand text-3xl font-medium transition-all duration-150 hover:scale-110 hover:text-white"
                onClick={toggleMenu}
            >
                7erfa
            </a>
        </div>
    )
}

function Navbar() {
    return (
        <nav
            className={`hidden items-center gap-5 font-medium text-main-transparent lg:flex`}
        >
            <ul className="flex gap-5">
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#about">About</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#services">Services</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#categories">Categories</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#team">Team</a>
                </li>
            </ul>
        </nav>
    )
}

function Buttons() {
    return (
        <div className="hidden gap-2 lg:flex">
            <Link to="/login">
                <button className="cursor-pointer rounded-full bg-transparent px-4 py-3 text-base font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500">
                    Log In
                </button>
            </Link>
            <Link to="/register">
                <button className="cursor-pointer rounded-full bg-transparent px-4 py-3 text-base font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500">
                    Sign Up
                </button>
            </Link>
        </div>
    )
}

function Menu({ isMenuOpen, toggleMenu }) {
    return (
        isMenuOpen && (
            <div className="absolute right-0 top-20 flex w-full justify-between divide-x-2 divide-main-50/10 bg-main-600 py-2 pl-3 text-2xl font-semibold shadow-lg transition-all lg:hidden">
                <ul className="my-2 flex flex-1 flex-col justify-around divide-y-2 divide-main-50/10">
                    <li className="p-2">
                        <a
                            href="#about"
                            onClick={toggleMenu}
                            className="text-lg font-semibold text-white"
                        >
                            About
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#services"
                            onClick={toggleMenu}
                            className="text-lg font-semibold text-white"
                        >
                            Services
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#categories"
                            onClick={toggleMenu}
                            className="text-lg font-semibold text-white"
                        >
                            Categories
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#team"
                            onClick={toggleMenu}
                            className="text-lg font-semibold text-white"
                        >
                            Team
                        </a>
                    </li>
                </ul>
                <br />
                <div className="flex-2 flex flex-col items-center justify-center px-2 tracking-wide">
                    <h1 className="mb-4 text-center text-2xl font-semibold uppercase text-white">
                        Join us now
                    </h1>
                    <div className="flex w-full items-center justify-between gap-4">
                        <Link to="/login">
                            <button className="cursor-pointer rounded-full bg-main-50 px-4 py-2 text-base font-semibold text-main-600 transition-all">
                                Log In
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="cursor-pointer rounded-full bg-main-50 px-4 py-2 text-base font-semibold text-main-600">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    )
}
