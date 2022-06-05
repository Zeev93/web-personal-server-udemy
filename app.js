const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config({path: '.env' })

const app = express()


// TODO: Load Routing
// ...

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// TODO:Configure Header HTTP

// TODO: Router Basic 


module.exports = app