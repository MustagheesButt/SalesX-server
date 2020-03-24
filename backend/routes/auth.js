const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const { User } = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
    const { error } = validateAuthRequest(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send('Wrong email or password!')

    if (!await bcrypt.compare(req.body.password, user.password))
        return res.status(400).send('Wrong email or password!')

    const token = user.generateAuthToken()
    res.send(token)
})

function validateAuthRequest(user) {
    const schema = {
        email: Joi.string().email().max(255).required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema)
}

module.exports = router