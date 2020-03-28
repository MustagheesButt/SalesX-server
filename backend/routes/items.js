const express = require('express')
const _ = require('lodash')

const { Item, validateItem } = require('../models/item')
const auth = require('../middleware/auth')

const router = express.Router()

// TODO: Make sure only the authenticated user's items are returned.
// Currently, it's returning all items.

router.get('/', async (req, res) => {
    const items = await Item.find().sort('name')
    res.send(items)
})

router.get('/:id', auth, async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

router.post('/', async (req, res) => {
    const { error } = validateItem(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const item = new Item(_.pick(req.body, ['name', 'description', 'barcode', 'price']))

    const result = await item.save()
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