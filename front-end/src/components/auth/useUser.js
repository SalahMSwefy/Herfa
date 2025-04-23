import { useQuery } from '@tanstack/react-query'
import { getMyAccount } from '../../services/apiAuth'

export function useUser() {
    const isAuth = Boolean(localStorage.getItem('token'))
    const {
        data: user,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['user'],
        queryFn: getMyAccount,
        enabled: isAuth,
    })

    return { user, error, isLoading, isAuth }
}
