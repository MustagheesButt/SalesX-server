import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../../components/common/form'
import Loading from '../common/loading'

const apiEndpoint = '/branches'

class NewBranchForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', businessEmail: '', phoneNumber: '', address: '', brand: '' },
            errors: {},
            awaitingResponse: false
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Branch Name'),
            businessEmail: Joi.string().email({ tlds: { allow: false } }).label('Business Email').allow(''),
            phoneNumber: Joi.string().label('Primary Phone Number').allow(''),
            address: Joi.string().label('Address').allow(''),
            brand: Joi.string().required()
        })
    }

    async postForm() {
        if (this.state.awaitingResponse) return

        try {
            this.setState({ awaitingResponse: true })
            const { data } = await http.post(apiEndpoint, this.state.formData)

            notificationService.alertSuccess(`Branch "${data.name}" created!`)
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

    componentDidMount() {
        const {formData} = this.state
        formData.brand = this.props.brands[0]._id
        
        this.setState({ formData })
    }

    render() {
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        if (this.state.awaitingResponse) return <Loading type='spinner' />
        
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brand', 'Brand', brands)}
                    {this.renderInput('name', 'Branch Name')}
                    {this.renderInput('businessEmail', 'Business Email', 'email')}
                    {this.renderInput('phoneNumber', 'Primary Phone Number')}
                    {this.renderInput('address', 'Address')}
                    {this.renderButton('Create')}
                </form>
            </div>
        )
    }
}

export default NewBranchForm