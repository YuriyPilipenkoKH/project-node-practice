const path = require('path')
const configPath = path.join(__dirname, '..', 'config', '.env')
const express = require('express')
require('colors') 
const connectDb  = require('../config/connectDb')
const errorHandler = require('./middlewares/errorHandler')



console.log(require('dotenv').config({path: configPath}))
// console.log(process.env.PORT)
// console.log(process.env.DB_HOST)

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use('/api/v1', require('./routes/drinksRoutes') )

app.use(errorHandler)

connectDb()

app.listen(process.env.PORT, () => {
console.log(`server is running on port: ${process.env.PORT}`.green.bold.italic)
})