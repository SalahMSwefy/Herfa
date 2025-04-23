import { Form, Link } from 'react-router-dom'

import Header from '../../ui/Header'
import { useLogin } from './useLogin'

const LoginPage = () => {
    const { login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        login(data)
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-20 bg-white dark:bg-gray-800 lg:gap-40">
            <Header />
            <Form
                className="inset-0 flex flex-col rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-gray-800 md:w-[450px]"
                aria-label="Login Form"
                method="post"
                onSubmit={handleSubmit}
            >
                <h3 className="text-dark-grey-900 mb-3 font-brand text-4xl font-extrabold dark:text-stone-100">
                    Login
                </h3>
                <p className="mb-4 text-stone-500 dark:text-stone-300">
                    Enter your email and password
                </p>
                <label
                    htmlFor="email"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="mb-6 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                    aria-label="Email Address"
                />
                <label
                    htmlFor="password"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter a Password"
                    className="mb-6 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                    aria-label="Password"
                />

                <div className="flex flex-row items-center justify-between gap-4">
                    <label className="flex items-center justify-between gap-2">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-stone-500 text-main-500 checked:bg-main-500 focus:ring-main-500"
                            aria-checked="true"
                            aria-label="Keep me logged in"
                        />
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-300">
                            Keep me logged in
                        </span>
                    </label>
                    <Link
                        to="/forgetPassword"
                        className="text-sm font-medium text-stone-900 hover:underline focus:underline dark:text-stone-100"
                    >
                        Forget password?
                    </Link>
                </div>
                <div className="my-4 flex justify-center">
                    <button
                        type="submit"
                        className="w-2/3 rounded-2xl bg-main-600 px-5 py-4 text-base font-bold leading-none text-white transition duration-300 hover:bg-main-500 focus:ring-4 focus:ring-main-500"
                        aria-label="Sign In"
                    >
                        Sign In
                    </button>
                </div>
                <p className="text-base font-normal leading-relaxed text-stone-500 dark:text-stone-300">
                    Not registered yet?
                    <Link
                        to="/register"
                        className="text-grey-700 ml-2 font-bold text-stone-900 hover:underline focus:underline dark:text-stone-100"
                    >
                        Create an Account
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default LoginPage
