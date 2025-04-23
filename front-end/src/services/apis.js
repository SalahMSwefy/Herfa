const VITE_API_URL = import.meta.env.VITE_API_URL
const API_URL = `${VITE_API_URL}/api/v1`

export async function createWorker(data) {
    const response = await fetch(`${API_URL}/workers/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}
export async function createCustomer(data) {
    const response = await fetch(`${API_URL}/customers/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}

export async function updateMe(data) {
    const response = await fetch(`${API_URL}/auth/updateMe`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

export async function forgotPassword(data) {
    const response = await fetch(`${API_URL}/auth/forgotPassword`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}

export async function resetPassword(data, token) {
    const response = await fetch(`${API_URL}/auth/resetPassword/${token}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}

// update picture
export async function uploadPictureWorker(data) {
    const response = await fetch(`${API_URL}/workers/update-profile-photo`, {
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

export async function uploadPictureCustomer(data) {
    const response = await fetch(`${API_URL}/customers/update-profile-photo`, {
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

// orders
export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
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
    return response.json()
}

// review
export async function createReview(workerId, data) {
    const response = await fetch(`${API_URL}/workers/${workerId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

export async function getReviews(workerId) {
    const response = await fetch(`${API_URL}/workers/${workerId}/reviews`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response.json()
}

export async function updateMyReview(workerId, data, reviewId) {
    const response = await fetch(
        `${API_URL}/workers/${workerId}/reviews/${reviewId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    )
    return response.json()
}

// workers

export async function getWorkers() {
    const response = await fetch(`${API_URL}/workers`)
    return response.json()
}

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`)
    return response.json()
}
