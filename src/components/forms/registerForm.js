import React from 'react'
import Joi from '@hapi/joi'
import { toast } from 'react-toastify'

import Form from '../../components/common/form'

import userService from '../../services/userService'
import authService from '../../services/authService'

class RegisterForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { firstName: '', lastName: '', email: '', password: '' },
            errors: {}
        }

        this.schema = Joi.object({
            firstName: Joi.string().min(2).required().label('First Name'),
            lastName: Joi.string().min(2).required().label('Last Name'),
            email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
            password: Joi.string().required().min(8).label('Password')
        })
    }

    async postForm() {
        try {
            const response = await userService.register(this.state.formData)
            toast.success(`${response.data.firstName} registered successfully!`)
            authService.loginWithJwt(response.headers['x-auth-token'])

            window.location = '/dashboard'
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors }
                errors.email = response.data
                this.setState({ errors })
            }
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('firstName', 'First Name')}
                    {this.renderInput('lastName', 'Last Name')}
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Register')}
                </form>
            </div>
        )
    }
}

export default RegisterForm