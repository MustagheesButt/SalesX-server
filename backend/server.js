const helmet = require('helmet')
const config = require('config')
const express = require('express')

const users = require('./routes/users')

const app = express()

app.use(express.json())
app.use(helmet())

app.use('/api/users', users)

app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})