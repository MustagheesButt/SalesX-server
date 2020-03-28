import axios from 'axios'

function get(url) {
    return axios.get(url)
}

function post(url, data) {
    return axios.post(url, data)
}

export default {
    get,
    post
}