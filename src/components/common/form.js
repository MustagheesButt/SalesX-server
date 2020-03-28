import React from 'react'
import Joi from '@hapi/joi'

import Input from './input'

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
        const { error } = this.schema.validate(this.state.formData, options)

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

        if (Object.keys(errors).length > 0) return

        this.postForm()
    }

    renderInput(name, label, type = 'text') {
        const { formData, errors } = this.state

        return (
            <Input
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
                <button type='submit'>{text}</button>
            </div>
        )
    }
}

export default Form