import { useEffect, useState } from 'react'
import { SquareX, SquareCheck, Star, ArchiveX } from 'lucide-react'
import { motion } from 'framer-motion'
import { getOrders, updateOrderStatus } from '../../services/apis'
import { Link } from 'react-router-dom'
import { encrypt } from '../../utils/cryptoUtils'

const CustomerOrders = () => {
    const [orders, setOrders] = useState([])
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [orderToCancel, setOrderToCancel] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                getOrders().then((data) => setOrders(data.data.orders))
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'in progress':
                return 'bg-blue-100 text-blue-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'canceled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredOrders = orders?.filter((order) => {
        const matchesStatus =
            filterStatus === 'all' ||
            order.status === filterStatus.toLowerCase()
        const matchesSearch =
            order.worker?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.service.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
    })

    const handleCancelOrder = (id) => {
        setOrderToCancel(id)
        setShowModal(true)
    }

    const confirmCancelOrder = async () => {
        if (orderToCancel) {
            await updateOrderStatus(orderToCancel, 'canceled')
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderToCancel
                        ? { ...order, status: 'canceled' }
                        : order,
                ),
            )
            setOrderToCancel(null)
            setShowModal(false)
        }
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    My Orders
                </h1>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full rounded-lg border border-gray-200 py-2 pl-4 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200 lg:pl-8 lg:pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-200 sm:w-auto"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            <div className="rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Worker
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Service
                                </th>
                                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100 lg:table-cell">
                                    Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-700">
                            {filteredOrders?.map((order, i) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-500"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        #{i + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500 dark:text-gray-100">
                                        {order.worker?.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500 dark:text-gray-100">
                                        {order.service}
                                    </td>
                                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100 lg:table-cell">
                                        {order.details}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 capitalize">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${getStatusColor(
                                                order.status,
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleString('en-EG')}
                                    </td>
                                    <td className="flex whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {order.status === 'pending' ? (
                                            <button
                                                className="flex items-center justify-center gap-2 text-red-600 dark:text-red-500"
                                                onClick={() =>
                                                    handleCancelOrder(order.id)
                                                }
                                            >
                                                <SquareX size={20} />
                                                <span className="font-semibold">
                                                    Cancel Order ?
                                                </span>
                                            </button>
                                        ) : order.status === 'in progress' ? (
                                            <span className="flex items-center justify-center gap-2 font-semibold text-green-600 dark:text-green-500">
                                                <SquareCheck size={20} />
                                                Accepted Order
                                            </span>
                                        ) : order.status === 'canceled' ? (
                                            <span className="flex items-center justify-center gap-2 font-medium text-red-600 dark:text-red-500">
                                                <ArchiveX size={20} />
                                                Canceled Order
                                            </span>
                                        ) : (
                                            <Link
                                                className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-500"
                                                to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(order.worker._id))}`}
                                                state={{ openReview: true }}
                                            >
                                                <Star size={20} />
                                                <span className="font-semibold">
                                                    Make Review
                                                </span>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-50">
                            Confirm Cancellation
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-200">
                            Are you sure you want to cancel this order?
                        </p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                No
                            </button>
                            <button
                                className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                                onClick={confirmCancelOrder}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default CustomerOrders
