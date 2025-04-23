import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as apiLogin } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: login } = useMutation({
        mutationFn: (formData) => apiLogin(formData),
        onSuccess: (data) => {
            console.log('Login successful:', data)
            toast.success('Login successful!')
            queryClient.setQueryData(['user'], data.data.user)
            localStorage.setItem('token', data.token)
            data.data.user.role === 'worker'
                ? navigate('/worker-dashboard')
                : navigate('/customer-dashboard')
        },
        onError: (error) => {
            toast.error('Login failed. Please try again.')
            console.error('Login error:', error)
        },
    })
    return { login }
}
