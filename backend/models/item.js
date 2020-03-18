const Joi = require('joi')
const mongoose = require('mongoose')

const Item = mongoose.model('Item', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    barcode: {
        type: String
    },
    price: {
        type: Number,
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

function validateItem(item) {
    const schema = {
        name: Joi.string().min(1).required(),
        description: Joi.string(),
        barcode: Joi.string(),
        price: Joi.number().required()
    }

    return Joi.validate(item, schema)
}

module.exports = {
    Item: Item,
    validateItem: validateItem
}