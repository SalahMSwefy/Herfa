import { useQuery } from '@tanstack/react-query'
import { getMyAccount } from '../../services/apiAuth'

export function useUser() {
    const isAuth = Boolean(localStorage.getItem('token'))
    const { data, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getMyAccount,
        enabled: isAuth,
    })
    const user = data?.data?.data
    return { user, error, isLoading, isAuth }
}
