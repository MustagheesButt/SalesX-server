import React from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'

import Form from '../../components/common/form'

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

    postForm() {
        const submitBtn = document.querySelector('button[type=submit]')
        submitBtn.innerHTML = 'Plz wait'

        axios.post('http://localhost:5000/api/users', {
            email: this.state.formData.email,
            password: this.state.formData.password
        })
            .then(response => {
                console.log(response)
                submitBtn.innerHTML = "Registered!"
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