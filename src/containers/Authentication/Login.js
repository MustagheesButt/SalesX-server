import React from 'react'

import './Authentication.css'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {
    return (
        <main id='auth' className='grid-container depth-1'>
            <div style={{ margin: '20px auto' }}>
                <h1>Login to your <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
            </div>

            <section className='card depth-2' style={{ margin: '20px auto' }}>
                <div>
                    <LoginForm />
                </div>
            </section>
        </main>
    )
}

export default Login