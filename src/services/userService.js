import http from './httpService'

import { apiUrl } from '../config.json'

const apiEndpoint = apiUrl + '/users'

function register(user) {
    return http.post(apiEndpoint, user)
}

export default {
    register
}