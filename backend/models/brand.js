const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    businessEmail: {
        type: String,
        maxlength: 255
    },
    phoneNumber: {
        type: String,
        maxlength: 60,
    },
    website: {
        type: String,
        maxlength: 150
    },
    description: {
        type: String,
        maxlength: 1200
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    branches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    updatedOn: {
        type: Date,
        default: Date.now
    }
})

const Brand = mongoose.model('Brand', brandSchema)

function validateBrand(brand) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        businessEmail: Joi.string().email().allow(''),
        phoneNumber: Joi.string().min(6).max(60).allow(''),
        website: Joi.string().min(3).max(150).allow(''),
        description: Joi.string().max(1200).allow('')
    })

    return schema.validate(brand)
}

module.exports = {
    Brand: Brand,
    validateBrand: validateBrand
}