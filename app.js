//request or response handler file

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

//Middleware -> It executes after the start of the server but before managing the routes

//0. cors middleware -> Removes the CORS restriction
app.use( cors() )

//1. nodemon -> it is going to start the server and if there is any change in the piece of code it will restart the server.

//2. body-parser -> you want a direct access to req.body object
//extended: false -> value in the key value pair is only going to be string or array
//extended: true -> value in the key value pair can be of any type

app.use( bodyParser.urlencoded( {extended: true} ))
app.use( bodyParser.json())

//3. morgan -> dev middleware = create a log for every request in the terminal
app.use(morgan('dev'))

//4. mongoose -> Prod dependency = Help to connect with the cloud database
mongoose.connect('mongodb+srv://Preetinder:wickisback@cluster0.r80de1q.mongodb.net/cu_09_db1?retryWrites=true&w=majority')
    .then(console.log('Connected to DB'))
    .catch(err => console.log(err))

const homeRoute = require('./api/routes/home')
const loginHandler = require('./api/routes/login')
const signupHandler = require('./api/routes/signup')

//managing routes

app.use('/', homeRoute)
app.use('/users/login', loginHandler)
app.use('/users/signup', signupHandler)

//handling req and res from express app

app.use((req, res) => {
    res.status(404).json({msg:"Resource not found"})
})

module.exports=app