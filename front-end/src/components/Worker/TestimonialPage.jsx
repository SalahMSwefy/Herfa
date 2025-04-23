import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { getReviews } from '../../services/apis'
import { useAuth } from '../../context/AuthContext'

const TestimonialPage = () => {
    const { user } = useAuth()
    const [reviews, setReview] = useState([])

    useEffect(() => {
        getReviews(user.id)
            .then((data) => {
                setReview(data.data.data)
            })
            .catch((error) => console.error('Error fetching reviews:', error))
    }, [user.id])

    const [searchTerm, setSearchTerm] = useState('')
    const [filterRating, setFilterRating] = useState('all')

    const filteredTestimonials = reviews?.filter((testimonial) => {
        const matchesSearch =
            testimonial.customer.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            testimonial.testimonialText
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        const matchesRating =
            filterRating === 'all' ||
            testimonial.rating === Number(filterRating)

        return matchesSearch && matchesRating
    })

    const renderStars = (rating) => {
        const fullStars = Array(rating).fill(
            <Star className="fill-yellow-500 text-yellow-500" size={20} />,
        )
        const emptyStars = Array(5 - rating).fill(
            <Star className="fill-gray-300 text-gray-300" size={20} />,
        )
        return [...fullStars, ...emptyStars]
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Reviews
                </h1>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <input
                    type="text"
                    placeholder="Search Reviews..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200 sm:pl-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200 sm:w-auto"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>

            <div className="rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Reviews ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    City
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Review
                                </th>
                                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100 lg:table-cell">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-700">
                            {filteredTestimonials.map((testimonial, i) => (
                                <tr
                                    key={testimonial.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-500"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        #{i + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500 dark:text-gray-100">
                                        {testimonial.customer.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        {testimonial.customer.city}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        {testimonial.review}
                                    </td>
                                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100 lg:table-cell">
                                        {new Date(
                                            testimonial.createdAt,
                                        ).toLocaleString('en-EG')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}

export default TestimonialPage
