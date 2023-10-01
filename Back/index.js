const express = require('express')
const {
    sessionMiddleware,
    wrap,
    corsConfig,
} = require('./server/controller/serverController')
const { Server } = require('socket.io')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./server/routers/authRouter')
const http = require('http')
const {
    authorizeUser,
    initializeUser,
    addFriend,
    onDisconnect,
    dm,
} = require('./server/controller/socketController')
const server = http.createServer(app) // Create an HTTP server
require('dotenv').config()

const io = new Server(server, {
    cors: corsConfig,
})

// Middleware setup
app.use(helmet())
app.use(cors(corsConfig))
app.use(express.json())
app.use(sessionMiddleware)

// Routes
app.use('/auth', authRouter)

io.use(wrap(sessionMiddleware))
io.use(authorizeUser)
io.on('connect', (socket) => {
    // Handle socket connections here
    initializeUser(socket)
    socket.on('add_friend', (friendName, cb) => {
        addFriend(socket, friendName, cb)
    })
    socket.on('dm', (message) => dm(socket, message))
    socket.on('disconnecting', () => {
        onDisconnect(socket)
    })
})

// Start the server
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
