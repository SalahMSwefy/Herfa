const VITE_API_URL = import.meta.env.VITE_API_URL
const API_URL = `${VITE_API_URL}/api/v1`

export async function getWorkers() {
    const res = await fetch(`${API_URL}/workers`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
    }

    return res.json()
}
