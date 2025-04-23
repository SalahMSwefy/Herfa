import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const VITE_API_URL = import.meta.env.VITE_API_URL
const TestimonialCard = ({ testimonial }) => {
    // Destructure the testimonial object
    const { customer = {}, review, rating } = testimonial

    // Generate the number of full stars and empty stars with unique keys
    const fullStars = Array(rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`full-${index}`}
                className="fill-yellow-500 text-yellow-500"
            />
        ))
    const emptyStars = Array(5 - rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`empty-${index}`}
                className="fill-gray-300 text-gray-300"
            />
        ))

    return (
        <div className="max-w-full rounded-lg border border-gray-200 p-4 font-sans hover:shadow-md">
            {/* Header */}
            <div className="mb-4 flex flex-col items-center justify-center gap-1 p-0.5 lg:flex-row lg:justify-between lg:gap-4">
                <div className="flex flex-col items-center justify-center gap-1 lg:flex-row lg:gap-2 xl:gap-4">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={`${VITE_API_URL}/uploads/${customer.image}`}
                        alt="Profile"
                        className="h-12 w-12 rounded-full object-cover object-center lg:h-16 lg:w-16"
                    />
                    <div className="flex flex-col items-center justify-center gap-1">
                        <h3 className="text-base font-bold capitalize dark:text-gray-50 xl:text-lg">
                            {customer?.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-200">
                            {customer?.city}
                        </p>
                    </div>
                </div>
                {/* Star Ratings */}
                <div className="flex gap-1 text-lg">
                    {[...fullStars, ...emptyStars]}
                </div>
            </div>
            {/* Testimonial Text */}
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-200 lg:pl-2 lg:text-start">
                {review}
            </p>
        </div>
    )
}

export default TestimonialCard
