import React from 'react'
import authService from '../../services/authService'

class Logout extends React.Component {
    componentDidMount() {
        authService.logout()
        window.location = '/'
    }

    render() {
        return (
            <p>Logging out...</p>
        )
    }
}

export default Logout