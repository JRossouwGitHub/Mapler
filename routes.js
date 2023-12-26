const express = require('express')
const Router = express.Router()

Router.use('/', (req, res) => {
    res.send('Get from Router')
})

module.exports = Router