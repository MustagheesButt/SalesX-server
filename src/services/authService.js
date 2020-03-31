import jwtDecode from 'jwt-decode'
import http from './httpService'

const apiEndpoint = '/auth'

http.setJwt(getJwt())

async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password })
    localStorage.setItem('jwt', jwt)
}

function loginWithJwt(jwt) {
    localStorage.setItem('jwt', jwt)
}

function logout() {
    localStorage.removeItem('jwt')
}

function getCurrentUser() {
    try {
        const token = localStorage.getItem('jwt')
        return jwtDecode(token)
    } catch (ex) {
        return null
    }
}

function getJwt() {
    return localStorage.getItem('jwt')
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}