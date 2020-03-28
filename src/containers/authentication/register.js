import React from 'react'

import RegisterForm from '../../components/forms/registerForm'
import './authentication.css'

class Register extends React.Component {

    render() {
        return (
            <main id='auth' className='grid-container depth-1'>
                <div style={{ margin: 'auto' }}>
                    <h1>Register a new <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
                </div>

                <section className='card depth-2' style={{ margin: 'auto' }}>
                    <div>
                        <RegisterForm />
                    </div>
                </section>
            </main>
        )
    }
}

export default Register