import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
})

export const loginAPI = (cpf, password) => api.post('/auth/login', { cpf, password })

export const forgotPasswordAPI = (email) => api.post('/auth/forgot-password', { email })

export const resetPasswordAPI = (token, newPassword) =>
  api.post('/auth/reset-password', { token, newPassword })
