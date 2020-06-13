import React, { useEffect } from 'react'

import RegisterForm from '../../components/forms/registerForm'
import './authentication.css'

const Register = () => {
    useEffect(() => {
        document.title = `Register | ${process.env.REACT_APP_NAME}`
    })

    return (
        <main id='auth' className='d-flex depth-1'>
            <div style={{ textAlign: 'center' }}>
                <h1>Register a new <span style={{ color: '#5c49b5' }}>SalesX</span> account.</h1>
            </div>

            <section className='card depth-2'>
                <div>
                    <RegisterForm />
                </div>
            </section>
        </main>
    )
}

export default Register