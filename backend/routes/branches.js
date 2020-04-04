const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const { Branch, validateBranch } = require('../models/branch')
const { Brand } = require('../models/brand')

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

    const branch = new Branch(_.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'address', 'brandId']))
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

    const branch = await Branch.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'businessEmail', 'phoneNumber', 'address', 'description']))

    if (!branch)
        return res.status(404).send(`Could not find branch with id: ${req.params.id}`)

    res.send(branch)
})

router.delete('/:id', auth, async (req, res) => {
    const branch = await Branch.findByIdAndDelete(req.params.id)

    if (!branch)
        return res.status(404).send(`Could not find branch with id: ${req.params.id}`)

    res.send(branch)
})

module.exports = router