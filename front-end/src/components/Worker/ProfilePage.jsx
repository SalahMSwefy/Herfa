import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { isValidEmail, isValidPhoneNumber } from '../../utils/helper'
import { updateMe, uploadPictureWorker } from '../../services/apis'
import { Form } from 'react-router-dom'
import { motion } from 'framer-motion'

const VITE_API_URL = import.meta.env.VITE_API_URL

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [newData, setNewData] = useState({})
    const [errors, setErrors] = useState({})
    const { allUsers: users, updateUser, user } = useAuth()
    const fileInputRef = useRef(null)

    useEffect(() => {
        const initialData = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            city: user.city,
            hourlyRate: user.hourlyRate,
            yearsOfExperience: user.yearsOfExperience,
            bio: user.bio,
        }
        if (!isEditing) {
            setErrors({})
            setNewData(initialData)
        }
    }, [isEditing, user])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewData((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handlePhotoUpload = async (file) => {
        try {
            const formData = new FormData()
            formData.append('photo', file)

            const response = await uploadPictureWorker(formData)
            console.log(response.data.updated_user)
            updateUser({ ...user, image: response.data.updated_user.image })
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                general:
                    'Photo upload failed. Please try again.' + error.message,
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}
        console.log(validationErrors)

        if (
            !isValidEmail(newData.email, users) &&
            newData.email !== user.email
        ) {
            validationErrors.email = 'Invalid email or email already exists'
        }

        if (
            !isValidPhoneNumber(newData.phoneNumber, users) &&
            newData.phoneNumber !== user.phoneNumber
        ) {
            validationErrors.phoneNumber =
                'Invalid phone number or phone number already exists'
        }

        if (newData.yearsOfExperience < 0) {
            validationErrors.yearsOfExperience =
                'Years of experience must be a 0 or positive number'
        }

        if (newData.hourlyRate < 0) {
            validationErrors.hourlyRate =
                'Your hourly gain must be a positive number'
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            await updateMe(newData).then((data) => {
                updateUser(data.data.user)
                setErrors({})
                setIsEditing(false)
            })

            const file = fileInputRef.current?.files[0]
            if (file) await handlePhotoUpload(file)
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                general: 'Update failed. Please try again.' + error.message,
            }))
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-4xl space-y-6"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl">
                    Profile
                </h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="rounded-xl bg-blue-600 px-2 py-1 text-sm font-medium text-white transition hover:bg-blue-700 md:px-4 md:py-2 md:text-base"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm dark:border dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
                    <div className="relative">
                        <img
                            src={`${VITE_API_URL}/uploads/${user.image}`}
                            alt="Profile"
                            className="h-32 w-32 rounded-full dark:border dark:border-gray-100"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center md:block">
                        <h2 className="text-xl font-bold capitalize text-gray-800 dark:text-gray-100 md:text-2xl">
                            {user.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {user.email}
                        </p>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                {user.skill}
                            </span>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <Form
                        onSubmit={handleSubmit}
                        method="patch"
                        className="space-y-4"
                        encType="multipart/form-data"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={newData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={newData.city}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={newData.email}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 ${errors.email ? 'border border-red-500' : ''}`}
                                />
                                {errors?.email && (
                                    <span className="mt-2 text-center text-xs text-red-500 md:text-sm">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phoneNumber"
                                    value={newData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                                />
                                {errors?.phoneNumber && (
                                    <p className="mt-2 text-center text-xs text-red-500 md:text-sm">
                                        {errors.phoneNumber}
                                    </p>
                                )}
                            </div>

                            {/* Hourly Rate */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    Hourly Rate
                                </label>
                                <input
                                    id="hourlyRate"
                                    type="number"
                                    name="hourlyRate"
                                    value={newData.hourlyRate}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                                />
                                {errors?.hourlyRate && (
                                    <span className="mt-2 text-center text-xs text-red-500 md:text-sm">
                                        {errors.hourlyRate}
                                    </span>
                                )}
                            </div>

                            {/* Years of Experience */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                    Years of Experience
                                </label>
                                <input
                                    id="yearsOfExperience"
                                    type="number"
                                    name="yearsOfExperience"
                                    value={newData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                                />
                                {errors?.yearsOfExperience && (
                                    <span className="mt-2 text-center text-xs text-red-500 md:text-sm">
                                        {errors.yearsOfExperience}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={newData.bio}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50">
                                Profile Picture
                            </label>
                            <input
                                ref={fileInputRef}
                                id="photo"
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </Form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200 md:text-base lg:text-lg">
                                    Contact Information
                                </h3>
                                <div className="mt-2 space-y-2 text-sm md:text-base lg:text-lg">
                                    <p className="text-gray-800 dark:text-gray-300">
                                        Phone: {user.phoneNumber}
                                    </p>

                                    <p className="text-gray-800 dark:text-gray-300">
                                        Email: {user.email}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-300">
                                        City: {user.city}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200 md:text-base lg:text-lg">
                                    Work Information
                                </h3>
                                <div className="mt-2 space-y-2 text-sm md:text-base lg:text-lg">
                                    <p className="text-gray-800 dark:text-gray-300">
                                        Experience: {user.yearsOfExperience}{' '}
                                        Years
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-300">
                                        Hourly Rate: {user.hourlyRate} $
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200 md:text-base lg:text-lg">
                                About
                            </h3>
                            <p className="mt-2 text-sm text-gray-800 dark:text-gray-300 md:text-base lg:text-lg">
                                {user.bio}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProfilePage
