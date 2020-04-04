const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const { Item, validateItem } = require('../models/item')
const { Brand } = require('../models/brand')
const auth = require('../middleware/auth')

const router = express.Router()

// TODO: authenticated user's items are returned. First get all of user's brands,
// then query for items against each brand.
router.get('/', auth, async (req, res) => {
    const filters = {}
    if (req.query.brandId)
        filters['brandId'] = req.query.brandId

    const items = await Item.find(filters).sort('name')
    res.send(items)
})

router.get('/:id', auth, async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

router.post('/', auth, async (req, res) => {
    const { error } = validateItem(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const session = await mongoose.startSession()
    session.startTransaction()

    const item = new Item(_.pick(req.body, ['name', 'description', 'barcode', 'price', 'brandId']))
    const result = await item.save({ session })

    // Save item's ID to selected brand's list of items
    const brand = await Brand.findOne({ _id: req.body.brandId })
    brand.items.push(result._id)
    await brand.save({ session })

    await session.commitTransaction()

    res.send(result)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateItem(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const item = await Item.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'barcode', 'price']))

    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

router.delete('/:id', auth, async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id)

    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

module.exports = router