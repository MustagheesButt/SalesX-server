import React from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'
import { toast } from 'react-toastify'

import Form from '../../components/common/form'

const apiEndpoint = 'http://localhost:5000/api/brands'

class NewShopForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', email: '', phoneNumber: '', address: '', description: '' },
            errors: {}
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Brand Name'),
            email: Joi.string().email({ tlds: { allow: false } }).label('Business Email'),
            phoneNumber: Joi.string().label('Primary Phone Number'),
            address: Joi.string().label('Address'),
            description: Joi.string().label('Description')
        })
    }

    async postForm() {
        try {
            const { data } = await axios.post(apiEndpoint, this.state.formData)

            toast(`Brand "${data.name}" created!`)
        } catch (ex) {
            console.error(ex.response.data)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('name', 'Brand Name')}
                    {this.renderInput('email', 'Business Email', 'email')}
                    {this.renderInput('phoneNumber', 'Primary Phone Number')}
                    {this.renderInput('address', 'Address')}
                    {this.renderInput('description', 'Description')}
                    {this.renderButton('Create')}
                </form>
            </div>
        )
    }
}

export default NewShopForm