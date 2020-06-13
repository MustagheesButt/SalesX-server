import React from 'react'
import Joi from '@hapi/joi'

import authService from '../../services/authService'

import Loading from '../common/loading'
import Form from '../common/form'

class LoginForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { email: '', password: '' },
            errors: {},
            awaitingResponse: false
        }

        this.schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
            password: Joi.string().required().label('Password')
        })
    }

    async postForm() {
        if (this.state.awaitingResponse) return

        try {
            const { email, password } = this.state.formData

            this.setState({ awaitingResponse: true })
            await authService.login(email, password)
            
            const { state } = this.props.location
            window.location = state ? state.from.pathname : '/dashboard'
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors }
                errors.email = response.data
                this.setState({ errors })
            }
        }

        this.setState({ awaitingResponse: false })
    }

    render() {
        if (this.state.awaitingResponse) return <Loading type='spinner' />

        return (
            <form className='mb-15'>
                {this.renderInput('email', 'Email', 'email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderButton('Login')}
            </form>
        )
    }
}

export default LoginForm