import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom' // Import Link
import { encrypt } from '../../utils/cryptoUtils'
import { StarIcon } from 'lucide-react'

const VITE_API_URL = import.meta.env.VITE_API_URL

const SearchWorkersPage = () => {
    const { workers } = useAuth()

    const [workersPerPage, setWorkersPerPage] = useState(9)

    useEffect(() => {
        const handleResize = () => {
            // Check if the screen width is less than 1024px
            const isSmallScreen = window.matchMedia(
                '(max-width: 1024px)',
            ).matches
            setWorkersPerPage(isSmallScreen ? 8 : 9)
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

    const [currentPage, setCurrentPage] = useState(1)

    // Filter state
    const [workerName, setWorkerName] = useState('')
    const [city, setCity] = useState('')
    const [category, setCategory] = useState('all')
    const [sortOption, setSortOption] = useState('none') // 'none', 'rating', 'experience', 'both'

    // Filter workers based on user inputs
    const filteredWorkers = workers.filter((worker) => {
        const matchesName = worker.name
            .toLowerCase()
            .includes(workerName.toLowerCase())
        const matchesCity = worker.city
            .toLowerCase()
            .includes(city.toLowerCase())
        const matchesCategory =
            category === 'all' ||
            worker.skill.toLowerCase() === category.toLowerCase()

        return matchesName && matchesCity && matchesCategory
    })

    // Sort workers based on the selected sort option
    const sortWorkers = (workers) => {
        switch (sortOption) {
            case 'rating':
                return workers.sort(
                    (a, b) => b.ratingsAverage - a.ratingsAverage,
                )
            case 'experience':
                return workers.sort(
                    (a, b) => b.yearsOfExperience - a.yearsOfExperience,
                )
            case 'both':
                return workers.sort((a, b) => {
                    if (b.ratingsAverage === a.ratingsAverage) {
                        return b.yearsOfExperience - a.yearsOfExperience
                    }
                    return b.ratingsAverage - a.ratingsAverage
                })
            default:
                return workers
        }
    }

    const sortedWorkers = sortWorkers(filteredWorkers)

    // Pagination
    const indexOfLastWorker = currentPage * workersPerPage
    const indexOfFirstWorker = indexOfLastWorker - workersPerPage
    const currentWorkers = sortedWorkers.slice(
        indexOfFirstWorker,
        indexOfLastWorker,
    )

    const totalPages = Math.ceil(sortedWorkers.length / workersPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="mb-6 text-2xl font-extrabold text-gray-800 dark:text-gray-100 lg:text-4xl">
                Search Workers
            </h1>
            <div className="mb-6 grid gap-4 md:grid-cols-2 xl:flex xl:flex-row">
                <input
                    type="text"
                    placeholder="Enter Worker Name"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200"
                />
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200"
                >
                    <option value="all">All</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="plumber">Plumber</option>
                    <option value="worker">Worker</option>
                </select>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200"
                >
                    <option value="none">Sort by</option>
                    <option value="rating">Rating</option>
                    <option value="experience">Years of Experience</option>
                    <option value="both">Rating & Experience</option>
                </select>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Workers
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentWorkers.map((worker) => (
                    <Link
                        key={worker._id}
                        to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(worker._id))}`}
                        className="flex items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-md hover:shadow-lg dark:border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover lg:h-24 lg:w-24"
                            src={`${VITE_API_URL}/uploads/${worker.image}`}
                            alt={worker.name}
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between font-semibold capitalize text-gray-800 dark:text-gray-100">
                                <h3 className="text-base xl:text-xl">
                                    {worker.name}
                                </h3>
                                <p className="flex items-center gap-1 text-sm text-yellow-500">
                                    {worker.ratingsAverage}
                                    <StarIcon
                                        size={14}
                                        className="fill-yellow-500"
                                    />
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {worker.skill}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                City: {worker.city}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Phone Num: {worker.phoneNumber}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Experience: {worker.yearsOfExperience} Years
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-400 hover:text-white disabled:bg-gray-200 sm:px-4 sm:py-2 sm:text-xl sm:font-semibold"
                >
                    Previous
                </button>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="rounded-lg bg-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-400 hover:text-white disabled:bg-gray-200 sm:px-4 sm:py-2 sm:text-xl sm:font-semibold"
                >
                    Next
                </button>
            </div>
        </motion.div>
    )
}

export default SearchWorkersPage
