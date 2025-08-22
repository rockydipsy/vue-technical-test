import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: (id) => api.get(`/users/${id}`)
}

export const productsAPI = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    getCategories: () => api.get('/products/categories')
}

export const usersAPI = {
    getProfile: (id) => api.get(`/users/${id}`)
}

export const cartsAPI = {
    getAll: () => api.get('/carts'),
    getById: (id) => api.get(`/carts/${id}`),
    addCart: (cart) => api.post('/carts', cart)
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api