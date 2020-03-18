const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('User', mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        minlength: 1,
        required: true
    },
    lastName: {
        type: String,
        minlength: 1,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
}))

function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required()
    }

    return Joi.validate(user, schema)
}

module.exports = {
    User: User,
    validateUser: validateUser
}