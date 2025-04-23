import { useQuery } from '@tanstack/react-query'
import { useUser } from '../auth/useUser'
import { getOrders } from '../../services/apiOrders'

export function useOrders() {
    const { isLoading, isAuth } = useUser()

    const { data, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        enabled: isAuth,
    })
    const orders = data?.data?.orders
    return { orders, isLoading: isLoading || isLoadingOrders }
}
