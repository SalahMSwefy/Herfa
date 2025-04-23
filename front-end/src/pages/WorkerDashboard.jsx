import { useState, useEffect } from 'react'
import {
    LayoutDashboard,
    UserCircle,
    LogOut,
    BookHeart,
    ListOrdered,
    Moon,
    Sun,
} from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom'

const VITE_API_URL = import.meta.env.VITE_API_URL

function WorkerDashboard() {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(location.pathname)
    const [loading, setLoading] = useState(true)
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const isAuth = Boolean(
        localStorage.getItem('token') && localStorage.getItem('user'),
    )

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location.pathname])

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => setLoading(false), 1000)
    }, [])

    // Sidebar Component
    const Sidebar = () => {
        const [minimized, setMinimized] = useState(false)

        useEffect(() => {
            const handleResize = () => {
                // Check if the screen width is less than or equal to 1024px (tablet or mobile)
                const isMobileOrTablet = window.matchMedia(
                    '(max-width: 1023px)',
                ).matches
                setMinimized(isMobileOrTablet)
            }

            // Initial check on component mount
            handleResize()

            // Add event listener for window resize
            window.addEventListener('resize', handleResize)

            // Cleanup event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [])

        useEffect(() => {
            const storedToken = localStorage.getItem('token')
            const storedUser = JSON.parse(localStorage.getItem('user'))
            if (storedToken === null || storedUser === null) navigate('/login')
            if (storedUser.role === 'customer') navigate('/customer-dashboard')
        }, [])

        const menuItems = [
            {
                title: 'Dashboard',
                icon: <LayoutDashboard size={20} />,
                page: '/worker-dashboard',
            },
            {
                title: 'Orders',
                icon: <ListOrdered size={20} />,
                page: '/worker-dashboard/orders',
            },
            {
                title: 'Reviews',
                icon: <BookHeart size={20} />,
                page: '/worker-dashboard/reviews',
            },
            {
                title: 'Profile',
                icon: <UserCircle size={20} />,
                page: '/worker-dashboard/profile',
            },
        ]

        return (
            <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="fixed left-0 top-0 z-20 h-screen w-fit border-r border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-800 lg:w-64"
            >
                <div className="h-16 border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-brand-light flex items-center">
                            <img
                                src="/logos/logo.gif"
                                alt="Logo"
                                className="h-12 w-12 rounded-full object-cover object-center"
                            />
                            <button
                                className="text-brand-light font-brand text-3xl no-underline transition-colors duration-200 hover:text-orange-500 dark:text-white dark:hover:text-orange-500"
                                onClick={() => {
                                    if (currentPage !== '/worker-dashboard')
                                        navigate('/worker-dashboard')
                                }}
                            >
                                {minimized || <span>7erfa</span>}
                            </button>
                        </div>
                    </motion.div>
                </div>

                <nav className="lg:p-4">
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.page}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`m-1 flex cursor-pointer items-center justify-center gap-1 rounded-lg p-3 text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-50 lg:justify-normal lg:gap-3 ${
                                currentPage === item.page
                                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-500 dark:text-white'
                                    : ''
                            }`}
                            onClick={() => {
                                if (currentPage !== item.page)
                                    navigate(item.page)
                            }}
                        >
                            {item.icon}
                            {minimized || (
                                <span className="font-medium">
                                    {item.title}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        )
    }

    // Header Component
    const Header = () => {
        const [darkMode, setDarkMode] = useState(
            localStorage.getItem('theme') === 'dark' || false,
        )

        useEffect(() => {
            if (darkMode) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        }, [darkMode])
        function handleLogout() {
            logout()
            navigate('/login')
        }
        return (
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="fixed left-20 right-0 top-0 z-10 h-16 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:left-64"
            >
                <div className="flex h-full items-center justify-end p-4">
                    <div className="flex items-center justify-end gap-4">
                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            src={`${VITE_API_URL}/uploads/${user.image}`}
                            alt="Profile"
                            className="h-8 w-8 cursor-pointer rounded-full border-2 border-blue-500 dark:border-stone-300"
                            onClick={() =>
                                navigate('/worker-dashboard/profile')
                            }
                        />
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>
        )
    }

    const renderPage = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {loading ? (
                        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                            <img
                                src="/logos/logo.gif"
                                alt="Loading..."
                                className="h-28 w-28 rounded-full object-cover object-center"
                            />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </motion.div>
            </AnimatePresence>
        )
    }

    return isAuth ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            <Sidebar />
            <div className="ml-20 lg:ml-64">
                <Header />
                <main className="pt-16">
                    <div className="p-6">{renderPage()}</div>
                </main>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default WorkerDashboard
