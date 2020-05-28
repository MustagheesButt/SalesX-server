import React from 'react'
import Joi from '@hapi/joi'

import notificationService from '../../services/notificationService'

import XInput from './xui/xinput'
import XButton from './xui/xbutton'
import XSelect from './xui/xselect'

class Form extends React.Component {

    inputChangeHandler = ({ currentTarget: input }) => {
        const errorMessage = this.validateProperty(input)
        const errors = { ...this.state.errors }

        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const formData = { ...this.state.formData }
        formData[input.name] = input.value

        this.setState({ formData, errors })
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }

        const schema = Joi.object({ [name]: this.schema.extract(name) })

        const { error } = schema.validate(obj)
        return error ? error.details[0].message : null
    }

    validate() {
        const options = { abortEarly: false }
        const schema = Joi.compile(this.schema)
        const { error } = schema.validate(this.state.formData, options)

        const errors = {}
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = err.message
            }
        }

        return errors
    }

    submitHandler = e => {
        e.preventDefault()

        const errors = this.validate()
        this.setState({ errors: errors })

        if (Object.keys(errors).length > 0) return notificationService.alertWarning(`There were some errors in the form submission.`)

        this.postForm()
    }

    renderInput(name, label, type = 'text') {
        const { formData, errors } = this.state

        return (
            <XInput
                type={type}
                name={name}
                label={label}
                value={formData[name]}
                onChange={this.inputChangeHandler}
                error={errors[name]} />
        )
    }

    renderButton(text) {
        return (
            <div className='form-group'>
                <XButton text={text} clickHandler={this.submitHandler} />
            </div>
        )
    }

    renderSelect(name, label, options = []) {
        const { formData, errors } = this.state
        options = options.map(option => {
            return <option key={option.value} value={option.value}>{option.text}</option>
        })
        
        return (
            <XSelect
                name={name}
                label={label}
                error={errors[name]}
                options={options}
                value={formData[name]}
                onChange={this.inputChangeHandler} />
        )
    }
}

export default Form