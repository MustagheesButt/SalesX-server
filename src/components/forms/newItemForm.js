import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../common/form'
import Loading from '../common/loading'

const apiEndpoint = '/items'

class NewItemForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', barcode: '', price: '', description: '', brand: '' },
            errors: {},
            awaitingResponse: false
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Item Name'),
            barcode: Joi.string().label('Barcode'),
            price: Joi.number().min(0).required().label('Price'),
            description: Joi.string().label('Description'),
            brand: Joi.string().required()
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData.brand = this.props.brands[0]._id
        
        this.setState({ formData })
    }

    async postForm() {
        if (this.state.awaitingResponse) return

        try {
            this.setState({ awaitingResponse: true })
            const { data } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Created new item ${data.name}`)
        } catch ({ response }) {
            if (response.data && response.status === 400) {
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
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        if (this.state.awaitingResponse) return <Loading type='spinner' />

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brand', 'Brand', brands)}
                    {this.renderInput('name', 'Item Name')}
                    {this.renderInput('barcode', 'Barcode')}
                    {this.renderInput('price', 'Price', 'number')}
                    {this.renderInput('description', 'Description')}
                    {this.renderButton('Add')}
                </form>
            </div>
        )
    }
}

export default NewItemForm