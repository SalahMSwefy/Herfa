import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useUser } from '../components/auth/useUser'
import { useQueryClient } from '@tanstack/react-query'

function Header() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { darkMode, toggleTheme } = useTheme()
    const { isAuth } = useUser()

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        queryClient.removeQueries() // Clear all cached data
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-white p-2 shadow-sm dark:border-gray-600 dark:bg-gray-800">
            <button
                className="flex items-center gap-2.5 font-brand text-3xl text-black no-underline transition-colors duration-200 hover:text-main-600 dark:text-white dark:hover:text-main-600"
                onClick={() => navigate('/')}
                aria-label="Go to Home"
            >
                <img
                    src="/logos/logo.gif"
                    alt="Logo"
                    className="h-12 w-12 rounded-full object-cover object-center"
                />
                <span>7erfa</span>
            </button>

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>

                {isAuth && (
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <LogOut size={18} />
                    </motion.button>
                )}
            </div>
        </header>
    )
}

export default Header
