require('dotenv').config()

const allowedOrigins = process.env.ALLOWED_ORIGIN // Add your origins here
const corsConfig = {
    credentials: true,
    origin: allowedOrigins,
}

module.exports = { corsConfig }
