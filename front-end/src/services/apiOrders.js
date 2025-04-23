const VITE_API_URL = import.meta.env.VITE_API_URL
const API_URL = `${VITE_API_URL}/api/v1`

export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }
    return response.json()
}

export async function makeOrder(data, workerId) {
    const response = await fetch(`${API_URL}/workers/${workerId}/orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    if (!response.ok) {
        throw new Error('error creating order')
    }
    return response.json()
}

export async function updateOrderStatus(orderId, status) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    if (!response.ok) {
        throw new Error('error updating order status')
    }
    return response.json()
}
