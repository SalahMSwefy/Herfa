import { createContext, useContext, useState, useEffect } from 'react'
import { getCustomers, getWorkers } from '../services/apis'

// Create AuthContext
const AuthContext = createContext()

// Provide context to children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [workers, setWorkers] = useState([])
    const [customers, setCustomers] = useState([])
    const allUsers = [...workers, ...customers]

    useEffect(() => {
        async function fetchData() {
            try {
                const workers = await getWorkers()
                const customers = await getCustomers()
                setWorkers(workers.data.data)
                setCustomers(customers.data.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(storedUser)
        }
    }, [])

    // Save token and user data on login
    const login = (token, userData) => {
        setToken(token)
        setUser(userData)
        localStorage.setItem('token', token)
        userData = JSON.stringify(userData)
        localStorage.setItem('user', userData)
    }

    // Clear data on logout
    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const updateUser = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    // Check token expiration

    return (
        <AuthContext.Provider
            value={{
                token,
                updateUser,
                workers,
                allUsers,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext)
