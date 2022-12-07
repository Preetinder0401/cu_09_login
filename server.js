//Creating a server using nodejs module - http

const http = require('http')
const app = require('./app')

// const PORT = 5001 || process.env.port

//For deployment
const PORT = process.env.port || 5001

const server = http.createServer(app)
server.listen(PORT)