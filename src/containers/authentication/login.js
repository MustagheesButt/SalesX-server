import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import LoginForm from '../../components/forms/loginForm'

import './authentication.css'

const Login = (props) => {
    useEffect(() => {
        document.title = `Login | ${process.env.REACT_APP_NAME}`
    })

    return (
        <main id='auth' className='d-flex depth-1'>
            <div style={{ textAlign: 'center' }}>
                <h1>Login to your <span style={{ color: '#5c49b5' }}>SalesX</span> account.</h1>
            </div>

            <section className='card depth-2' style={{ height: '40%' }}>
                <div>
                    <LoginForm {...props} />
                    <div>Don't have an account? <Link to='/register'>Register</Link> now.</div>
                </div>
            </section>
        </main>
    )
}

export default Login