const VITE_API_URL = import.meta.env.VITE_API_URL
const API_URL = `${VITE_API_URL}/api/v1`

export async function login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
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

export async function getMyAccount() {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
    }
    return res.json()
}
