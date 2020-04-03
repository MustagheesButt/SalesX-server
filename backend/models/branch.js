const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const Branch = mongoose.model('Brand', mongoose.Schema({
    name: {
        type: String,
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
    description: {
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
    const schema = {
        name: Joi.string().min(1).required(),
        businessEmail: Joi.string().email().allow(''),
        phoneNumber: Joi.string().allow(''),
        description: Joi.string().allow(''),
        brandId: Joi.objectId().required()
    }

    return Joi.validate(branch, schema)
}

module.exports = {
    Branch: Branch,
    validateBranch: validateBranch
}