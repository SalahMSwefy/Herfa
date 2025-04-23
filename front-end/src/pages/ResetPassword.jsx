import { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { resetPassword } from '../services/apis'

const ResetPassword = () => {
    const token = useParams().token
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || false,
    )
    const [error, setError] = useState('')

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const password = e.target.password.value
        const passwordConfirm = e.target.passwordConfirm.value
        const data = {
            password,
            passwordConfirm,
        }
        console.log(data)

        console.log(password === passwordConfirm && password.length >= 8)

        if (password === passwordConfirm && password.length >= 8) {
            resetPassword(data, token)
                .then((data) => {
                    console.log(data)
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setError('Passwords do not match')
            return
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-20 bg-white dark:bg-gray-800 lg:gap-40">
            <div className="flex h-16 w-full items-center justify-between border-b p-2 shadow-sm dark:border-gray-600">
                <button
                    className="flex items-center gap-2.5 font-brand text-3xl text-black no-underline transition-colors duration-200 hover:text-main-600 dark:text-white dark:hover:text-main-600"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img
                        src="/logos/logo.gif"
                        alt="Logo"
                        className="h-12 w-12 rounded-full object-cover object-center"
                    />
                    <span>7erfa</span>
                </button>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
            </div>
            <Form
                method="POST"
                className="inset-0 flex flex-col rounded-3xl bg-white p-10 text-center shadow-2xl dark:bg-gray-800 md:w-[450px]"
                onSubmit={handleSubmit}
            >
                <h3 className="mb-3 font-brand text-2xl font-extrabold text-stone-900 dark:text-stone-100 md:text-4xl">
                    Reset Password
                </h3>
                <p className="mb-4 text-xs text-stone-500 dark:text-stone-300 md:text-base">
                    Enter your new password below
                </p>

                <label
                    htmlFor="password"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    New Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter a new password"
                    className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                />

                <label
                    htmlFor="passwordConfirm"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Confirm Password
                </label>
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm your new password"
                    className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                />

                {error && (
                    <span className="-mt-4 mb-4 text-center text-base text-red-500">
                        Passwords do not match
                    </span>
                )}

                <div className="mb-2 flex justify-center">
                    <button
                        type="submit"
                        className="mb-5 w-2/3 rounded-2xl bg-orange-500 px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-orange-600"
                    >
                        Reset Password
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default ResetPassword
