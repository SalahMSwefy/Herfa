import { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createCustomer, createWorker } from '../services/apis'
import {
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
} from '../utils/helper'
import { useAuth } from '../context/AuthContext'

import Header from '../ui/Header'

const Register = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('worker')
    const [errors, setErrors] = useState({})
    const { allUsers: users } = useAuth()

    const mutation = useMutation({
        mutationFn: async (formData) => {
            if (role === 'worker') {
                return await createWorker(formData)
            } else {
                return await createCustomer(formData)
            }
        },
        onSuccess: (data) => {
            if (data?.error) {
                setErrors({ general: data.error })
            } else {
                navigate('/login')
            }
        },
        onError: (error) => {
            const backendErrors = error.response?.data?.errors || {}
            setErrors({
                ...backendErrors,
                general:
                    error.message || 'Something went wrong. Please try again.',
            })
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        console.log(data)
        const validationErrors = {}
        console.log(validationErrors)

        if (!isValidEmail(data.email, users)) {
            validationErrors.email = 'Invalid email or email already exists'
        }
        if (!isValidPassword(data.password)) {
            validationErrors.password = 'Password must be at least 8 characters'
        }
        if (data.password !== data.passwordConfirm) {
            validationErrors.passwordConfirm = 'Passwords do not match'
        }
        if (!isValidPhoneNumber(data.phoneNumber, users)) {
            validationErrors.phoneNumber =
                'Invalid phone number or phone number already exists'
        }
        if (data.yearsOfExperience < 0 || data.hourlyRate < 0) {
            validationErrors.yearsOfExperience =
                'Years of experience and hourly gain must be a 0 or positive number'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        console.log('Form submission data:', data)
        setErrors({})
        mutation.mutate(data)
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-gray-800">
            <Header />
            <Form
                onSubmit={handleSubmit}
                className="inset-0 mt-4 flex w-full flex-col rounded-3xl p-4 text-center shadow-xl dark:bg-gray-800 md:w-[450px]"
            >
                <h3 className="mb-3 w-auto font-brand text-2xl font-extrabold text-stone-900 dark:text-stone-100 md:text-3xl">
                    {role === 'worker' ? 'Worker' : 'Customer'} Registration
                </h3>
                <p className="mb-4 text-sm text-stone-500 dark:text-stone-300 md:text-base">
                    Enter your details to create an account
                </p>
                {/* Radio Buttons for Role Selection */}
                <div className="mb-4 flex justify-center gap-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="role"
                            value="worker"
                            checked={role === 'worker'}
                            onChange={handleRoleChange}
                            className="mr-2 hidden"
                        />
                        <span
                            className={`${role === 'worker' ? 'bg-main-600' : ''} rounded-lg px-3 py-2 text-base font-medium tracking-wide text-stone-900 dark:text-stone-100 md:text-lg`}
                        >
                            Worker
                        </span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="role"
                            value="customer"
                            checked={role === 'customer'}
                            onChange={handleRoleChange}
                            className="mr-2 hidden"
                        />
                        <span
                            className={`${role !== 'worker' ? 'bg-main-600' : ''} rounded-lg px-3 py-2 text-lg font-medium tracking-wide text-stone-900 dark:text-stone-100`}
                        >
                            Customer
                        </span>
                    </label>
                </div>
                {/* form inputs */}
                <label
                    htmlFor="name"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                />

                <label
                    htmlFor="email"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100 ${errors.email ? 'border border-red-500' : ''}`}
                    required
                />
                {errors?.email && (
                    <span className="-mt-4 text-center text-sm text-red-500">
                        {errors.email}
                    </span>
                )}
                <div className="flex flex-col items-center sm:flex-row md:space-x-4">
                    <div className="flex w-full flex-1 flex-col sm:w-auto">
                        <label
                            htmlFor="password"
                            className="text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter a password"
                            className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100 ${errors.password ? 'border border-red-500' : ''}`}
                            required
                        />
                        {errors?.password && (
                            <p className="-mt-4 text-center text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full flex-1 flex-col sm:w-auto">
                        <label
                            htmlFor="passwordConfirm"
                            className="text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            placeholder="Confirm password"
                            className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100 ${errors.passwordConfirm ? 'border border-red-500' : ''}`}
                            required
                        />
                        {errors?.passwordConfirm && (
                            <p className="-mt-4 text-center text-xs text-red-500">
                                {errors.passwordConfirm}
                            </p>
                        )}
                    </div>
                </div>
                <label
                    htmlFor="phoneNumber"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Phone Number
                </label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                    required
                />
                {errors?.phoneNumber && (
                    <p className="-mt-4 text-center text-sm text-red-500">
                        {errors.phoneNumber}
                    </p>
                )}

                <label
                    htmlFor="city"
                    className="mb-2 pl-1 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    City
                </label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                />

                {/* Conditional Form Fields for Worker */}
                {role === 'worker' && (
                    <>
                        {role === 'worker' && (
                            <>
                                <label
                                    htmlFor="skill"
                                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                                >
                                    Skill
                                </label>
                                <select
                                    id="skill"
                                    name="skill"
                                    className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 py-2 pl-4 text-sm font-medium text-stone-900 outline-none transition duration-300 ease-in-out hover:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                                    required
                                    defaultValue={''}
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="text-stone-400 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Select your skill
                                    </option>
                                    <option
                                        value="Electrical"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Electrical
                                    </option>
                                    <option
                                        value="Mechanical"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Mechanical
                                    </option>
                                    <option
                                        value="Carpentry"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Carpentry
                                    </option>
                                    <option
                                        value="Painting"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Painting
                                    </option>
                                    <option
                                        value="Plumber"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Plumber
                                    </option>
                                    <option
                                        value="Worker"
                                        className="text-stone-900 hover:bg-orange-50 dark:bg-gray-700 dark:text-stone-100"
                                    >
                                        Construction Worker
                                    </option>
                                </select>
                            </>
                        )}
                        <div className="flex flex-col items-center sm:flex-row md:space-x-4">
                            <div className="flex w-full flex-1 flex-col sm:w-auto">
                                <label
                                    htmlFor="yearsOfExperience"
                                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                                >
                                    Years of Experience
                                </label>
                                <input
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    type="number"
                                    placeholder="Years of Experience"
                                    className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                                    required
                                />
                            </div>
                            <div className="flex w-full flex-1 flex-col sm:w-auto">
                                <label
                                    htmlFor="hourlyRate"
                                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                                >
                                    Hourly Rate
                                </label>
                                <input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    placeholder="Hourly Rate"
                                    className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                                    required
                                />
                            </div>
                        </div>
                        {errors?.yearsOfExperience && (
                            <p className="-mt-4 text-center text-sm text-red-500">
                                {errors.yearsOfExperience}
                            </p>
                        )}
                        <label
                            htmlFor="bio"
                            className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                        >
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            placeholder="Write a brief bio"
                            className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                            required
                        />
                    </>
                )}

                <div className="mb-4 flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-1/2 rounded-2xl bg-main-600 px-5 py-3 text-lg font-bold leading-none tracking-wider text-white transition duration-300 hover:bg-main-500 focus:ring-4 focus:ring-main-600"
                    >
                        Register
                    </button>
                </div>

                <p className="text-base font-normal leading-relaxed text-stone-500 dark:text-stone-300">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-grey-700 ml-2 font-bold text-stone-900 hover:underline focus:underline dark:text-stone-100"
                    >
                        Log In
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default Register
