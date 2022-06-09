const mongoose = require('mongoose')
const app = require('./app')
const connectDB = require('./config/db')
require('dotenv').config({ path: '.env' })

connectDB()
const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
    console.log(`http://localhost:${PORT}`);
} )