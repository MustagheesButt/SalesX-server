import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../common/form'

const apiEndpoint = '/items'

class NewItemForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', barcode: '', price: '', description: '', brandId: '' },
            errors: {}
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Item Name'),
            barcode: Joi.string().label('Barcode'),
            price: Joi.number().required().label('Price'),
            description: Joi.string().label('Description'),
            brandId: Joi.string().required()
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData.brandId = this.props.brands[0]._id
        
        this.setState({ formData })
    }

    async postForm() {
        try {
            const { data } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Created new item ${data.name}`)
        } catch ({ response }) {
            notificationService.alertDanger(`Something went wrong! ${response.data}`)
        }
    }

    render() {
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brandId', 'Brand', brands)}
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