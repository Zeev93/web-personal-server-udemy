const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config({path: '.env' })
const cors = require('cors')

const app = express()
app.use(cors())


// TODO: Load Routing
const userRoutes = require('./routers/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// TODO:Configure Header HTTP

// TODO: Router Basic 
app.use(`/api`, userRoutes)


module.exports = app