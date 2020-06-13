import React from 'react'
import Joi from '@hapi/joi'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Form from '../../components/common/form'
import Loading from '../common/loading'

const apiEndpoint = '/employees'

class NewEmployeeForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { firstName: '', lastName: '', email: '', phoneNumber: '', password: '', title: '', salary: '', brand: '', branch: '' },
            errors: {},
            awaitingResponse: false
        }

        this.schema = Joi.object({
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            email: Joi.string().email({ tlds: { allow: false } }).label('Email').allow(''),
            phoneNumber: Joi.string().when('email', {not: '', then: Joi.string().allow('')}).label('Phone Number'),
            password: Joi.string().min(8).required().label('Password'),
            title: Joi.string().label('Job Title').allow(''),
            salary: Joi.number().label('Salary').allow(''),
            brand: Joi.string().required(),
            branch: Joi.string().required()
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData.brand = this.props.brands[0]._id
        formData.branch = this.props.branches[0]._id
        
        this.setState({ formData })
    }

    async postForm() {
        if (this.state.awaitingResponse) return

        try {
            this.setState({ awaitingResponse: true })
            const { data: employee } = await http.post(apiEndpoint, this.state.formData)
            notificationService.alertSuccess(`Employee "${employee.firstName} ${employee.lastName}" added!`)
        } catch ({ response }) {
            if (response.errors && response.statusCode === 400) {
                const errors = response.errors
                this.setState({ errors })
            }
        }

        this.setState({ awaitingResponse: false })
    }

    render() {
        const brands = this.props.brands.map(brand => {
            return { text: brand.name, value: brand._id }
        })

        const branches = this.props.branches.map(branch => {
            return { text: branch.name, value: branch._id }
        })

        if (this.state.awaitingResponse) return <Loading type='spinner' />

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderSelect('brand', 'Brand', brands)}
                    {this.renderSelect('branch', 'Branch', branches)}
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