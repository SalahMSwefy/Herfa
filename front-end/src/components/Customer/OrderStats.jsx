import { CheckCircle, Clock, List, XCircle } from 'lucide-react'

const OrderStats = ({ orders }) => {
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
            title: 'Total Orders',
            value: orders?.length || '0',
            icon: <List size={20} />,
            color: 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
        },
        {
            title: 'Completed Orders',
            value: completedOrders,
            icon: <CheckCircle size={20} />,
            color: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
        },
        {
            title: 'Active Orders',
            value: activeOrders,
            icon: <Clock size={20} />,
            color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
        },
        {
            title: 'Canceled Orders',
            value: canceledOrders,
            icon: <XCircle size={20} />,
            color: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => Stat(index, stat))}
        </div>
    )
}

function Stat(index, stat) {
    return (
        <div
            key={index}
            className={`rounded-xl p-6 ${stat.color} transform shadow-lg transition-all duration-200 hover:scale-105`}
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white dark:text-gray-100">
                    {stat.title}
                </h3>
                <div className="rounded-lg bg-white/20 p-2">{stat.icon}</div>
            </div>
            <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white dark:text-gray-100">
                    {stat.value}
                </p>
            </div>
        </div>
    )
}

export default OrderStats
