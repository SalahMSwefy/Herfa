import { useQuery } from '@tanstack/react-query'
import { useUser } from '../auth/useUser'
import { getWorkers } from '../../services/apiWorkers'

export function useWorkers() {
    const { isLoading, isAuth } = useUser()
    const { data, isLoading: isLoadingWorkers } = useQuery({
        queryKey: ['workers'],
        queryFn: getWorkers,
        enabled: isAuth,
    })
    const workers = data?.data?.data
    return { workers, isLoading: isLoading || isLoadingWorkers }
}
