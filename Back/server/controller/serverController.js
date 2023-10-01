const RedisStore = require('connect-redis').default
const redisClient = require('../../redis')
require('dotenv').config()
const session = require('express-session')

const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    store: new RedisStore({ client: redisClient }),
    expires: 1000 * 60 * 60 * 24 * 7,
    cookie: {
        secure: process.env.ENVIRONMENT === 'production',
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    },
})

const wrap = (expressMiddleware) => (socket, next) =>
    expressMiddleware(socket.request, {}, next)

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173'] // Add your origins here
const corsConfig = {
    credentials: true,
    origin: allowedOrigins,
}

module.exports = { sessionMiddleware, wrap, corsConfig }
