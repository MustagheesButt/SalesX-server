import React from 'react'

import './authentication.css'
import LoginForm from '../../components/forms/loginForm'

const Login = (props) => {
    return (
        <main id='auth' className='grid-container depth-1'>
            <div style={{ margin: '20px auto' }}>
                <h1>Login to your <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
            </div>

            <section className='card depth-2' style={{ margin: '20px auto' }}>
                <div>
                    <LoginForm {...props} />
                </div>
            </section>
        </main>
    )
}

export default Login