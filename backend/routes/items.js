const config = require('config')
const express = require('express')
const { Item, validateItem } = require('../models/item')
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
    const items = await Item.find().sort('name')
    res.send(items)
})

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

router.post('/', async (req, res) => {
    const { error } = validateItem(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        barcode: req.body.barcode,
        price: req.body.price
    })

    const result = await item.save()
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const { error } = validateItem(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        barcode: req.body.barcode,
        price: req.body.price
    })

    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

router.delete('/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id)
    
    if (!item)
        return res.status(404).send(`Could not find item with id: ${req.params.id}`)

    res.send(item)
})

module.exports = router