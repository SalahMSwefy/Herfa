import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
}

export default CustomerDashboard
