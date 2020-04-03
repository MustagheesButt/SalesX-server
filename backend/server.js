const helmet = require('helmet')
const config = require('config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/users')
const items = require('./routes/items')
const brands = require('./routes/brands')
const branches = require('./routes/branches')
const auth = require('./routes/auth')

const app = express()

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: JWT key not defined.')
    process.exit(1)
}

const CONN_STRING = config.get('database.connection_string')
mongoose.connect(CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => {
        console.log('Could not connect to MongoDB.', err)
    })

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: '*'
}))

app.use('/api/users', users)
app.use('/api/items', items)
app.use('/api/brands', brands)
app.use('/api/branches', branches)
app.use('/api/auth', auth)

app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = config.get('expressPort')

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})