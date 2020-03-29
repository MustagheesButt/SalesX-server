import React from 'react'
import authService from '../../services/authService'

class Logout extends React.Component {
    componentDidMount() {
        authService.logout()

        setTimeout(function() {
            window.location = '/'
        }, 2000)
    }

    render() {
        document.write('<p>Logging out...</p>')
        return null
    }
}

export default Logout