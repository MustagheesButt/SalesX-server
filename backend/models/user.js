const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const _ = require('lodash')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    brands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }]
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(_.pick(this, ['_id', 'email', 'firstName', 'lastName']), config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).required(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required()
    }

    return Joi.validate(user, schema)
}

module.exports = {
    User: User,
    validateUser: validateUser
}