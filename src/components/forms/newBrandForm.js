import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../../components/common/form'
import Loading from '../common/loading'

const apiEndpoint = '/brands'

class NewBrandForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', businessEmail: '', phoneNumber: '', website: '', description: '' },
            errors: {},
            awaitingResponse: false
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Brand Name'),
            businessEmail: Joi.string().email({ tlds: { allow: false } }).label('Business Email').allow(''),
            phoneNumber: Joi.string().label('Primary Phone Number').allow(''),
            website: Joi.string().label('Website').allow(''),
            description: Joi.string().label('Description').allow('')
        })
    }

    async postForm() {
        if (this.state.awaitingResponse) return

        try {
            this.setState({ awaitingResponse: true })
            const { data } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Brand "${data.name}" created!`)
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors }
                response.data.forEach(error => {
                    errors[error.context.key] = error.message
                })
                this.setState({ errors })
            }
        }

        this.setState({ awaitingResponse: false })
    }

    render() {
        if (this.state.awaitingResponse) return <Loading type='spinner' />
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('name', 'Brand Name')}
                    {this.renderInput('businessEmail', 'Business Email', 'email')}
                    {this.renderInput('phoneNumber', 'Primary Phone Number')}
                    {this.renderInput('website', 'Website')}
                    {this.renderInput('description', 'Description')}
                    {this.renderButton('Create')}
                </form>
            </div>
        )
    }
}

export default NewBrandForm