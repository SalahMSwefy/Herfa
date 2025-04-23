import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Search, LayoutDashboard, UserCircle, ListOrdered } from 'lucide-react'
import { useUser } from '../components/auth/useUser'
import Header from '../ui/Header'
import Sidebar from '../ui/Sidebar'
import FullPageLoader from '../ui/FullPageLoader'

const menuItems = [
    {
        title: 'Dashboard',
        icon: <LayoutDashboard size={20} />,
        page: '/customer-dashboard',
    },
    {
        title: 'Search Workers',
        icon: <Search size={20} />,
        page: '/customer-dashboard/search',
    },
    {
        title: 'Orders',
        icon: <ListOrdered size={20} />,
        page: '/customer-dashboard/orders',
    },
    {
        title: 'Profile',
        icon: <UserCircle size={20} />,
        page: '/customer-dashboard/profile',
    },
]

function CustomerDashboard() {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(location.pathname)
    const { isLoading } = useUser()

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location.pathname])

    if (isLoading) return <FullPageLoader />

    return (
        <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-700">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar menuItems={menuItems} currentPage={currentPage} />
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard
