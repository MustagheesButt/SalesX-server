import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../../components/common/form'

const apiEndpoint = '/employees'

class NewEmployeeForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { firstName: '', lastName: '', email: '', phoneNumber: '', password: '', title: '', salary: '', brandId: '', branchId: '' },
            errors: {}
        }

        this.schema = Joi.object({
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            email: Joi.string().email({ tlds: { allow: false } }).label('Email').allow(''),
            phoneNumber: Joi.string().when('email', {not: '', then: Joi.string().allow('')}).label('Phone Number'),
            password: Joi.string().min(8).required().label('Password'),
            title: Joi.string().label('Job Title').allow(''),
            salary: Joi.number().label('Salary').allow(''),
            brandId: Joi.string().required(),
            branchId: Joi.string().required()
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData.brandId = this.props.brands[0]._id
        formData.branchId = this.props.branches[0]._id
        
        this.setState({ formData })
    }

    async postForm() {
        try {
            const { data: employee } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Employee "${employee.firstName} ${employee.lastName}" added!`)
        } catch ({ response }) {
            if (response.errors && response.statusCode === 400) {
                const errors = response.errors
                this.setState({ errors })
            }
        }
    }

    render() {
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        const branches = this.props.branches.map(branch => {
            return { text: branch.name, value: branch._id }
        })

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brandId', 'Brand', brands)}
                    {this.renderSelect('branchId', 'Branch', branches)}
                    {this.renderInput('firstName', 'First Name')}
                    {this.renderInput('lastName', 'Last Name')}
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('phoneNumber', 'Phone Number')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('title', 'Job Title')}
                    {this.renderInput('salary', 'Salary', 'number')}
                    {this.renderButton('Add')}
                </form>
            </div>
        )
    }
}

export default NewEmployeeForm