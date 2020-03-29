import React from 'react'
import axios from 'axios'
import Joi from '@hapi/joi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Form from '../common/form'

const apiEndpoint = 'http://localhost:5000/api/items'

toast.configure()

class NewItemForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { name: '', barcode: '', price: '', description: '' },
            errors: {}
        }

        this.schema = Joi.object({
            name: Joi.string().required().label('Item Name'),
            barcode: Joi.string().label('Barcode'),
            price: Joi.number().required().label('Price'),
            description: Joi.string().label('Description')
        })
    }

    async postForm() {
        try {
            const { data } = await axios.post(apiEndpoint, this.state.formData)
            toast(`Created new item ${data.name}`)
        } catch ({ response }) {
            toast(`Something went wrong! ${response.data}`)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
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