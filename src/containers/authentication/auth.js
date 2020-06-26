import React, { useEffect } from 'react'
import authService from '../../services/authService'
import userService from '../../services/userService'

const authUrl = process.env.REACT_APP_AUTH_URL

const Auth = () => {
    useEffect(() => {
        document.title = `Logging in...`
    })

    const jwt = new URLSearchParams(window.location.search).get('jwt')
    const next = new URLSearchParams(window.location.search).get('next')

    if (jwt && next) {
        authService.loginWithJwt(jwt)

        // check if user exists, and create it in salesx if not
        const currUser = authService.getCurrentUser()
        const user = {
            _id: currUser._id,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            email: currUser.email
        }
        userService.register(user)
            .then(({ data }) => {
                console.log('user registered')
            })
            .catch(err => {
                console.log(err)
            })

            window.location = (next === (`//${window.location.host}/`)) ? '/dashboard' : next
    } else {
        window.location = `${authUrl}?next=${window.location}`
    }

    return (
        <p>Logging in...</p>
    )
}

export default Auth