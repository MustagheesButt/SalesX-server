const Joi = require('joi')
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
    title: {
        type: String
    },
    salary: {
        type: Number
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
    const schema = {
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        title: Joi.string().allow(''),
        salary: Joi.number(),
        branchId: Joi.objectId().required()
    }

    return Joi.validate(employee, schema)
}

module.exports = {
    Employee: Employee,
    validateEmployee: validateEmployee
}