const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const { Branch, validateBranch } = require('../models/branch')
const { User } = require('../models/user')

const auth = require('../middleware/auth')

const router = express.Router()


router.get('/', auth, async (req, res) => {
    const filters = {}
    if (req.query.brandId)
        filters['brandId'] = req.query.brandId

    const branches = await Branch.find(filters).sort('name')
    res.send(branches)
})

router.get('/:id', auth, async (req, res) => {
    const branch = await Branch.findById(req.params.id)
    if (!branch)
        return res.status(404).send(`Could not find branch with id: ${req.params.id}`)

    res.send(branch)
})

router.post('/', auth, async (req, res) => {
    const { error } = validateBranch(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const session = await mongoose.startSession()
    session.startTransaction()

    const branch = new Branch(_.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'website', 'description', 'brandId']))
    const result = await branch.save({ session })

    // Save branch's ID to the brand it was added to
    const brand = await Brand.findOne({ _id: req.body.brandId })
    brand.branches.push(result._id)
    await brand.save({ session })
    
    await session.commitTransaction()

    res.send(result)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateBrand(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const brand = await brand.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'address', 'description']))

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