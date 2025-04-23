import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StarIcon } from 'lucide-react'
import { encrypt } from '../../utils/cryptoUtils'
import { useUser } from '../auth/useUser'
import { useWorkers } from './useWorkers'
import { useOrders } from './useOrders'
import OrderStats from './OrderStats'

const VITE_API_URL = import.meta.env.VITE_API_URL

const skills = [
    'Mechanical',
    'Electrical',
    'Carpentry',
    'Painting',
    'Plumber',
    'Worker',
]

const DashboardPage = () => {
    const { user } = useUser()
    const { orders } = useOrders()
    const { workers } = useWorkers()

    const groupedWorkers = skills.reduce((acc, skill) => {
        const workersForSkill = workers?.filter(
            (worker) => worker.skill === skill,
        )
        // Find the worker with the maximum years of experience for each skill
        const topWorker = workersForSkill?.reduce((maxWorker, worker) => {
            return worker.yearsOfExperience > maxWorker.yearsOfExperience
                ? worker
                : maxWorker
        }, workersForSkill[0])

        acc[skill] = topWorker
        return acc
    }, {})

    return (
        <div className="space-y-8">
            <motion.div
                className="mb-8 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-3xl font-extrabold capitalize text-gray-800 dark:text-gray-100">
                        Welcome back, {user.name} 👋
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        Here&apos;s an overview of your recent activities.
                    </p>
                </div>
            </motion.div>
            <OrderStats orders={orders} />
            <h3 className="block text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Most Experience Workers
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {skills.map((skill) => (
                    <motion.div
                        key={skill}
                        className="flex items-center rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Link
                            key={skill}
                            to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(groupedWorkers[skill]?.id))}`}
                            className="flex w-full items-center justify-between rounded-lg p-6 shadow-md hover:shadow-lg dark:border dark:border-gray-600 sm:gap-4"
                        >
                            <motion.img
                                whileHover={{ scale: 1.2 }}
                                src={`${VITE_API_URL}/uploads/${groupedWorkers[skill]?.image}`}
                                alt={skill}
                                className="mr-4 h-16 w-16 rounded-full border border-gray-300 object-cover dark:border-white lg:h-20 lg:w-20"
                            />
                            <div className="flex-1">
                                <h3 className="flex items-center justify-between text-sm font-semibold capitalize text-gray-800 dark:text-gray-100 lg:text-lg">
                                    {groupedWorkers[skill]?.name || 'No Worker'}
                                    <p className="flex items-center justify-between gap-0.5 rounded-2xl bg-gray-100 px-1 py-0.5 text-xs text-yellow-500 dark:bg-gray-600 lg:px-2 lg:py-1 lg:text-sm">
                                        {groupedWorkers[skill]?.ratingsAverage}
                                        <StarIcon
                                            size={12}
                                            className="fill-yellow-500"
                                        />
                                    </p>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    {skill}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    City: {groupedWorkers[skill]?.city || 'N/A'}{' '}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    Phone:{' '}
                                    {groupedWorkers[skill]?.phoneNumber ||
                                        'N/A'}{' '}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    Experience:{' '}
                                    {groupedWorkers[skill]?.yearsOfExperience ||
                                        'N/A'}
                                    {' Years'}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage
