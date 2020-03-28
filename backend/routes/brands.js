const express = require('express')
const _ = require('lodash')

const { Brand, validateBrand } = require('../models/brand')
const auth = require('../middleware/auth')

const router = express.Router()

// TODO: Make sure only the authenticated user's brands are returned.
// Currently, it's returning all brands.

router.get('/', async (req, res) => {
    const brands = await Brand.find().sort('name')
    res.send(brands)
})

router.get('/:id', auth, async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand)
        return res.status(404).send(`Could not find brand with id: ${req.params.id}`)

    res.send(brand)
})

router.post('/', async (req, res) => {
    const { error } = validateBrand(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const brand = new Brand(_.pick(req.body, ['name', 'description', 'barcode', 'price']))

    const result = await brand.save()
    res.send(result)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateBrand(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const brand = await brand.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'barcode', 'price']))

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