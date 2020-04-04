import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../../components/common/form'

const apiEndpoint = '/branches'

class NewBranchForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', businessEmail: '', phoneNumber: '', address: '', brandId: '' },
            errors: {}
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Branch Name'),
            businessEmail: Joi.string().email({ tlds: { allow: false } }).label('Business Email').allow(''),
            phoneNumber: Joi.string().label('Primary Phone Number').allow(''),
            address: Joi.string().label('Address').allow(''),
            brandId: Joi.string().required()
        })
    }

    async postForm() {
        try {
            const { data } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Branch "${data.name}" created!`)
        } catch ({ response }) {
            if (response.errors && response.statusCode === 400) {
                const errors = response.errors
                this.setState({ errors })
            }

            if (response.data && response.statusCode === 400) {
                notificationService.alertDanger(`Something went wrong. ${response.data}.`)
            }
        }
    }

    componentDidMount() {
        const {formData} = this.state
        formData.brandId = this.props.brands[0]._id
        
        this.setState({ formData })
    }

    render() {
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brandId', 'Brand', brands)}
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