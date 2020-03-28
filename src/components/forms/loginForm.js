import React from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'
import { Link } from 'react-router-dom'

import Form from '../common/form'

class LoginForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { email: '', password: '' },
            errors: {}
        }

        this.schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
            password: Joi.string().required().label('Password')
        })
    }

    postForm() {
        const submitBtn = document.querySelector('button[type=submit]')
        submitBtn.innerHTML = 'Plz wait'

        axios.post('http://localhost:5000/api/auth', {
            email: this.state.formData.email,
            password: this.state.formData.password
        })
            .then(response => {
                console.log(response)
                submitBtn.innerHTML = "Logged In!"
            })
            .catch(err => {
                console.error(err.response.data)
                submitBtn.innerHTML = "Try Again"
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>

                <div>Don't have an account? <Link to='/register'>Register</Link> now.</div>
            </div>
        )
    }
}

export default LoginForm