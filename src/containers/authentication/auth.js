import React, { useEffect } from 'react'
import authService from '../../services/authService'
import userService from '../../services/userService'
import notificationService from '../../services/notificationService'
import logger from '../../services/logService'

const authUrl = process.env.REACT_APP_AUTH_URL

const Auth = () => {
    useEffect(() => {
        document.title = `Logging in...`
    })

    const jwt = new URLSearchParams(window.location.search).get('jwt')
    const next = new URLSearchParams(window.location.search).get('next')

    if (jwt && next) {
        authService.loginWithJwt(jwt)

        // TODO: <<check if user exists>>, and create it in salesx if not
        const currUser = authService.getCurrentUser()
        const user = {
            _id: currUser._id,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            email: currUser.email
        }
        userService.register(user)
            .then(({ data }) => {
                console.log('user registered', data)
                window.location = (next === (`//${window.location.host}/`)) ? '/dashboard' : next
            })
            .catch(err => {
                logger.log('Could not register user')
                logger.log(err)
                window.location = '/'
            })
    } else {
        window.location = `${authUrl}?next=${window.location}`
    }

    return (
        <p>Logging in...</p>
    )
}

export default Auth