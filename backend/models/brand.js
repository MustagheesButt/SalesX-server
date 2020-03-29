const Joi = require('joi')
const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    businessEmail: {
        type: String,
        maxlength: 255,
        unique: true
    },
    phoneNumber: {
        type: String,
        minlength: 6,
        maxlength: 60,
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 1000
    },
    description: {
        type: String,
        maxlength: 1200
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
})

const Brand = mongoose.model('Brand', brandSchema)

function validateBrand(brand) {
    const schema = {
        name: Joi.string().max(255).required(),
        businessEmail: Joi.string().email(),
        phoneNumber: Joi.string().min(6).max(60),
        address: Joi.string().max(1000),
        description: Joi.string().max(1200)
    }

    return Joi.validate(brand, schema)
}

module.exports = {
    Brand: Brand,
    validateBrand: validateBrand
}