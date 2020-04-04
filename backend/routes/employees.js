const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const { Employee, validateEmployee } = require('../models/employee')
const { Brand } = require('../models/brand')
const { Branch } = require('../models/branch')

const auth = require('../middleware/auth')

const router = express.Router()


router.get('/', auth, async (req, res) => {
    const filters = {}
    if (req.query.branchId)
        filters['branchId'] = req.query.branchId

    const employees = await Employee.find(filters).sort('name')
    res.send(employees)
})

router.get('/:id', auth, async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee)
        return res.status(404).send(`Could not find employee with id: ${req.params.id}`)

    res.send(employee)
})

router.post('/', auth, async (req, res) => {
    const { error } = validateEmployee(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const session = await mongoose.startSession()
    session.startTransaction()

    const employee = new Employee(_.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'title', 'salary', 'brandId', 'branchId']))
    
    const salt = await bcrypt.genSalt(10)
    employee.password = await bcrypt.hash(employee.password, salt)

    const result = await employee.save({ session })

    // Save employee's ID to the branch it was added to
    const brand = await Brand.findOne({ _id: req.body.brandId })
    brand.employees.push(result._id)
    await brand.save({ session })

    // Save employee's ID to the branch it was added to
    const branch = await Branch.findOne({ _id: req.body.branchId })
    branch.employees.push(result._id)
    await branch.save({ session })
    
    await session.commitTransaction()

    res.send(result)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validateBranch(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const branch = await branch.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'email', 'phoneNumber', 'address', 'description']))

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