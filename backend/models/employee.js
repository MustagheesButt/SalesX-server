const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    title: {
        type: String
    },
    salary: {
        type: Number
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
}))

function validateEmployee(employee) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().allow(''),
        phoneNumber: Joi.string().when('email', {not: '', then: Joi.string().allow('')}),
        password: Joi.string().min(8).required(),
        title: Joi.string().allow(''),
        salary: Joi.number().allow(''),
        brandId: Joi.objectId().required(),
        branchId: Joi.objectId().required()
    })

    return schema.validate(employee)
}

module.exports = {
    Employee: Employee,
    validateEmployee: validateEmployee
}