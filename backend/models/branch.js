const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const Branch = mongoose.model('Branch', mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    businessEmail: {
        type: String,
        maxlength: 255
    },
    phoneNumber: {
        type: String,
        maxlength: 60,
    },
    address: {
        type: String
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    updatedOn: {
        type: Date,
        default: Date.now
    }
}))

function validateBranch(branch) {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        businessEmail: Joi.string().email().allow(''),
        phoneNumber: Joi.string().allow(''),
        address: Joi.string().allow(''),
        brandId: Joi.objectId().required()
    })

    return schema.validate(branch)
}

module.exports = {
    Branch: Branch,
    validateBranch: validateBranch
}