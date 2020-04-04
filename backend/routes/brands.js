const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const { Brand, validateBrand } = require('../models/brand')
const { User } = require('../models/user')

const auth = require('../middleware/auth')

const router = express.Router()


router.get('/', auth, async (req, res) => {
    const brands = await Brand.find({ userId: req.token._id }).sort('name')
    res.send(brands)
})

router.get('/:id', auth, async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand)
        return res.status(404).send(`Could not find brand with id: ${req.params.id}`)

    res.send(brand)
})

router.post('/', auth, async (req, res) => {
    const { error } = validateBrand(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const session = await mongoose.startSession()
    session.startTransaction()

    const brand = new Brand({ 'userId': req.token._id, ..._.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'website', 'description']) })
    const result = await brand.save({ session })

    // Save brand's ID to current user's list of brands
    const user = await User.findOne({ _id: req.token._id })
    user.brands.push(result._id)
    await user.save({ session })
    
    await session.commitTransaction()

    res.send(result)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateBrand(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const brand = await Brand.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'address', 'description']))

    if (!brand)
        return res.status(404).send(`Could not find brand with id: ${req.params.id}`)

    res.send(brand)
})

router.delete('/:id', auth, async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id)

    if (!brand)
        return res.status(404).send(`Could not find brand with id: ${req.params.id}`)

    res.send(brand)
})

module.exports = router