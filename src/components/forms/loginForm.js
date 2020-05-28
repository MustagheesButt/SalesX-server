import React from 'react'
import Joi from '@hapi/joi'
import { Link } from 'react-router-dom'

import authService from '../../services/authService'

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

    async postForm() {
        try {
            const { email, password } = this.state.formData
            await authService.login(email, password)
            const { state } = this.props.location
            window.location = state ? state.from.pathname : '/dashboard'
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors }
                errors.email = response.data
                this.setState({errors})
            }
        }
    }

    render() {
        return (
            <div>
                <form>
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