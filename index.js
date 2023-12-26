const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/endpoints', routes)

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})