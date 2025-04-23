import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ menuItems, currentPage }) => {
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
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <motion.aside
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={`z-20 h-screen border-r border-gray-200 bg-white pt-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
                minimized ? 'w-16' : 'w-64'
            } transition-all duration-300`}
            role="navigation"
            aria-label="Sidebar"
        >
            {/* Navigation */}
            <nav className="lg:p-4">
                {menuItems.map((item) => (
                    <motion.div
                        key={item.page}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`m-1 mb-2 flex cursor-pointer items-center justify-center rounded-lg p-3 text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:justify-start lg:gap-3 ${
                            currentPage === item.page
                                ? 'bg-blue-100 text-blue-600 dark:bg-gray-500 dark:text-white'
                                : ''
                        }`}
                        onClick={() => {
                            if (currentPage !== item.page) navigate(item.page)
                        }}
                        aria-label={item.title}
                    >
                        {item.icon}
                        {!minimized && (
                            <span className="font-medium">{item.title}</span>
                        )}
                    </motion.div>
                ))}
            </nav>
        </motion.aside>
    )
}

export default Sidebar
