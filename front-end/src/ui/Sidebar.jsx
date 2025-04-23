import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ menuItems }) => {
    const [minimized, setMinimized] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            const isMobileOrTablet = window.matchMedia(
                '(max-width: 1023px)',
            ).matches
            setMinimized(isMobileOrTablet)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="fixed left-0 top-0 z-20 h-screen w-fit border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:w-64"
        >
            <div className="flex h-16 items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                >
                    <div className="text-brand-light flex items-center gap-2.5">
                        <button
                            className="flex items-center gap-2.5 font-brand text-3xl no-underline transition-colors duration-200 hover:text-orange-500 dark:text-white dark:hover:text-orange-500"
                            onClick={() => {
                                if (currentPage !== '/customer-dashboard')
                                    navigate('/customer-dashboard')
                            }}
                        >
                            <img
                                src="/logos/logo.gif"
                                alt="Logo"
                                className="h-12 w-12 rounded-full object-cover object-center"
                            />

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
                        className={`m-1 mb-2 flex cursor-pointer items-center justify-center rounded-lg p-3 text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-50 lg:justify-normal lg:gap-3 ${
                            currentPage === item.page
                                ? 'bg-blue-50 text-blue-600 dark:bg-gray-500 dark:text-white'
                                : ''
                        }`}
                        onClick={() => {
                            if (currentPage !== item.page) navigate(item.page)
                        }}
                    >
                        {item.icon}
                        {minimized || (
                            <span className="font-medium">{item.title}</span>
                        )}
                    </motion.div>
                ))}
            </nav>
        </motion.div>
    )
}

export default Sidebar
