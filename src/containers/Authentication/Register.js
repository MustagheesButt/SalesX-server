import React from 'react'
import axios from 'axios'

import './Authentication.css'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    async submitHandler(e) {
        e.preventDefault()

        const submitBtn = document.querySelector('button[type=submit]')
        submitBtn.innerHTML = 'Plz wait'

        const firstName = document.querySelector('input[name=firstName]').value
        const lastName = document.querySelector('input[name=lastName]').value
        const email = document.querySelector('input[name=email]').value
        const password = document.querySelector('input[name=password]').value

        axios.post('http://localhost:5000/api/users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            submitBtn.innerHTML = "Registered!"
        })
        .catch(err => {
            console.error(err.response.data)
            submitBtn.innerHTML = "Try Again"
        })

        //this.props.history.replace('/dashboard')
    }

    render() {
        return (
            <main id='auth' className='flex-container depth-1'>
                <div style={{ margin: 'auto' }}>
                    <h1>Register a new <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
                </div>

                <section className='card depth-2' style={{ margin: 'auto' }}>
                    <div>
                        <form>
                            <div className='form-group'>
                                <label>First Name</label>
                                <input type='text' name='firstName' placeholder='First name' />
                            </div>

                            <div className='form-group'>
                                <label>Last Name</label>
                                <input type='text' name='lastName' placeholder='Last name' />
                            </div>

                            <div className='form-group'>
                                <label>Email</label>
                                <input type='email' name='email' placeholder='Your email address' />
                            </div>

                            <div className='form-group'>
                                <label>Password</label>
                                <input type='password' name='password' placeholder='Your password' />
                            </div>

                            <div className='form-group'>
                                <button type='submit' onClick={this.submitHandler}>Register</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        )
    }
}

export default Register