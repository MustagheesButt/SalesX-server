import React from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'
import { Link } from 'react-router-dom'

import Input from '../../components/Common/Input'

import './Authentication.css'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            account: { email: '', password: '' },
            errors: {}
        }

        this.schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
            password: Joi.string().required().label('Password')
        })
    }

    inputChangeHandler = ({ currentTarget: input }) => {
        const errorMessage = this.validateProperty(input)
        const errors = { ...this.state.errors }
        
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const account = { ...this.state.account }
        account[input.name] = input.value

        this.setState({ account, errors })
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }

        const schema = Joi.object({ [name]: this.schema.extract(name) })
        const { error } = schema.validate(obj)

        return error ? error.details[0].message : null
    }

    validate() {
        const options = { abortEarly: false }
        const { error } = this.schema.validate(this.state.account, options)

        const errors = {}
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = err.message
            }
        }

        return errors
    }

    submitHandler = e => {
        e.preventDefault()

        const errors = this.validate()
        this.setState({ errors: errors })

        if (Object.keys(errors).length > 0) return

        const submitBtn = document.querySelector('button[type=submit]')
        submitBtn.innerHTML = 'Plz wait'

        axios.post('http://localhost:5000/api/auth', {
            email: this.state.account.email,
            password: this.state.account.password
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
        const { account, errors } = this.state

        return (
            <main id='auth' className='flex-container depth-1'>
                <div style={{ margin: '20px auto' }}>
                    <h1>Login to your <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
                </div>

                <section className='card depth-2' style={{ margin: '20px auto' }}>
                    <div>
                        <form onSubmit={this.submitHandler}>
                            <Input
                                type='email'
                                name='email'
                                label='Email'
                                value={account.email}
                                onChange={this.inputChangeHandler}
                                placeholder='Email address'
                                error={errors.email} />

                            <Input
                                type='password'
                                name='password'
                                label='Password'
                                value={account.password}
                                onChange={this.inputChangeHandler}
                                placeholder='Password'
                                error={errors.password} />

                            <div className='form-group'>
                                <button type='submit'>Login</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        Don't have an account? <Link to='/register'>Register</Link> now.
                    </div>
                </section>
            </main >
        )
    }
}

export default Login