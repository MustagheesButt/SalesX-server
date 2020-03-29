const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const {User, validateUser} = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.find().sort('email')

    res.send(users.map(user => _.pick(user, ['_id', 'email', 'firstName', 'lastName'])))
})

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(_.pick(user, ['_id', 'email', 'firstName', 'lastName']))
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    if (await User.findOne({ email: req.body.email }))
        return res.status(400).send('User already registered.')

    const user = new User(_.pick(req.body, ['email', 'password', 'firstName', 'lastName']))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ['_id', 'email', 'firstName', 'lastName']))
})

// TODO: this probably needs work
router.put('/:id', auth, async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id, _.pick(req.body, ['email', 'password']))

    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(_.pick(user, ['_id', 'email', 'firstName', 'lastName']))
})

router.delete('/:id', auth, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(_.pick(user, ['_id', 'email', 'firstName', 'lastName']))
})

module.exports = router