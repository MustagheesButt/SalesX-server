import jwtDecode from 'jwt-decode'
import http from './httpService'

http.setJwt(getJwt())

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
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}