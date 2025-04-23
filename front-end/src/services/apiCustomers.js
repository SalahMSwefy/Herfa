const VITE_API_URL = import.meta.env.VITE_API_URL
const API_URL = `${VITE_API_URL}/api/v1`

export async function getWorkers() {
    const response = await fetch(`${API_URL}/workers`)
    return response.json()
}
