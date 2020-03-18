const config = require('config')
const express = require('express')
const {User, validateUser} = require('../models/user')
const router = express.Router()

const CONN_STRING = config.get('database.connection_string')
mongoose.connect(CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => {
        console.log('Could not connect to MongoDB.', err)
    })

router.get('/', async (req, res) => {
    const users = await User.find().sort('email')
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(user)
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const result = await user.save()
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password
    })

    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(user)
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user)
        return res.status(404).send(`Could not find user with id: ${req.params.id}`)

    res.send(user)
})

module.exports = router