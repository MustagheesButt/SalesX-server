import React from 'react'
import Joi from '@hapi/joi'
import { toast } from 'react-toastify'

import http from '../../services/httpService'

import Form from '../../components/common/form'

const apiEndpoint = '/brands'

class NewBranchForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', businessEmail: '', phoneNumber: '', address: '', description: '' },
            errors: {}
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Branch Name'),
            businessEmail: Joi.string().email({ tlds: { allow: false } }).label('Business Email'),
            phoneNumber: Joi.string().label('Primary Phone Number'),
            address: Joi.string().label('Address'),
            description: Joi.string().label('Description')
        })
    }

    async postForm() {
        try {
            const { data } = await http.post(apiEndpoint, this.state.formData)

            toast(`Branch "${data.name}" created!`)
        } catch ({ response }) {
            if (response.errors && response.statusCode === 400) {
                const errors = this.state.errors
                
                this.setState({ errors })
            }
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('name', 'Branch Name')}
                    {this.renderInput('businessEmail', 'Business Email', 'email')}
                    {this.renderInput('phoneNumber', 'Primary Phone Number')}
                    {this.renderInput('address', 'Address')}
                    {this.renderInput('description', 'Description')}
                    {this.renderButton('Create')}
                </form>
            </div>
        )
    }
}

export default NewBranchForm