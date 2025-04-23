import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import TestimonialCard from '../../ui/TestimonialCard'
import { motion } from 'framer-motion'
import { Clock, CircleCheck, Star, Calendar, X } from 'lucide-react'
import { getOrders, getReviews } from '../../services/apis'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [reviews, setReview] = useState([])
    const [orders, setOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        getOrders().then((data) => {
            if (data.data.orders && data.data.orders.length > 0) {
                setOrders(data.data.orders.slice(0, 3)) // Get the first three orders
            } else {
                setOrders([]) // Set an empty array if there are no orders
            }
            setAllOrders(data.data.orders)
        })
    }, [])

    useEffect(() => {
        getReviews(user.id)
            .then((data) => {
                if (data.data.data.length < 3) {
                    setReview(data.data.data)
                } else {
                    setReview([
                        data.data.data[0],
                        data.data.data[1],
                        data.data.data[2],
                    ])
                }
            })
            .catch((error) => console.error('Error fetching reviews:', error))
    }, [user.id])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                        Here&apos;s what&apos;s happening with your tasks today.
                    </p>
                </div>
            </div>
            <WorkerStats user={user} orders={allOrders} />
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                <WorkerTasks navigate={navigate} orders={orders} />
                <TestimonialList reviews={reviews} navigate={navigate} />
            </div>
        </motion.div>
    )
}

const WorkerStats = ({ user, orders }) => {
    const completedOrders = orders?.filter(
        (order) => order.status === 'completed',
    ).length

    const activeOrders = orders?.filter(
        (order) => order.status === 'in progress' || order.status === 'pending',
    ).length

    const canceledOrders = orders?.filter(
        (order) => order.status === 'canceled',
    ).length

    const stats = [
        {
            title: 'Completed Orders',
            value: completedOrders,
            icon: <CircleCheck size={20} />,
            color: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
        },
        {
            title: 'Active Orders',
            value: activeOrders,
            icon: <Clock size={20} />,
            color: 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
        },
        {
            title: 'Canceled Orders',
            value: canceledOrders,
            icon: <X size={20} />,
            color: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
        },

        {
            title: 'Rating',
            value: user.ratingsAverage,
            icon: <Star size={20} className="fill-yellow-500" />,
            color: 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`rounded-xl p-6 ${stat.color} transform shadow-lg transition-all duration-200 hover:scale-105`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white">
                            {stat.title}
                        </h3>
                        <div className="rounded-lg bg-white/20 p-2">
                            {stat.icon}
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-white">
                            {stat.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

const WorkerTasks = ({ navigate, orders }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Active Orders
                </h2>
                <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                    onClick={() => navigate('/worker-dashboard/orders')}
                >
                    View All
                </button>
            </div>
            <div className="space-y-4">
                {orders.length > 0
                    ? orders?.map((task) => (
                          <div
                              key={task?.id}
                              className="rounded-lg border border-gray-300 p-4 text-sm transition-all duration-200 hover:shadow-md md:text-lg"
                          >
                              <div className="mb-2 flex items-start justify-between">
                                  <div>
                                      <h3 className="font-medium capitalize text-gray-800 dark:text-gray-100">
                                          {task?.service}
                                      </h3>
                                      <p className="text-sm capitalize text-gray-500 dark:text-gray-300">
                                          Client: {task?.customer?.name}
                                      </p>
                                  </div>
                                  <span
                                      className={`flex rounded-full px-2 py-1 text-xs font-medium capitalize lg:text-sm ${
                                          task?.status === 'in progress'
                                              ? 'bg-blue-100 text-blue-800'
                                              : task?.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : task?.status === 'completed'
                                                  ? 'bg-green-100 text-green-800'
                                                  : 'bg-red-100 text-red-800'
                                      }`}
                                  >
                                      {task?.status}
                                  </span>
                              </div>
                              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                                  <Calendar size={16} />
                                  <span>
                                      Due:{' '}
                                      {new Date(task?.createdAt).toLocaleString(
                                          'en-EG',
                                      )}
                                  </span>
                              </div>
                          </div>
                      ))
                    : 'No Active Orders'}
            </div>
        </div>
    )
}

const TestimonialList = ({ reviews, navigate }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-50">
                    Latest Reviews
                </h2>
                <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                    onClick={() => navigate('/worker-dashboard/reviews')}
                >
                    View All
                </button>
            </div>
            <div className="space-y-4">
                {reviews.length > 0
                    ? reviews?.map((testimonial) => (
                          <TestimonialCard
                              key={testimonial.id}
                              testimonial={testimonial}
                          />
                      ))
                    : 'No Reviews'}
            </div>
        </div>
    )
}
export default DashboardPage
