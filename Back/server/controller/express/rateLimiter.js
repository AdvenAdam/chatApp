const redisClient = require('../../../redis')

module.exports.rateLimiter =
    (secondLimit, limitAmount) => async (req, res, next) => {
        const ip = req.connection.remoteAddress
        // this code using for limiting only 10 requests per minute (counter reset in 1 minute)
        const [response] = await redisClient
            .multi()
            .incr(ip)
            .expire(ip, secondLimit)
            .exec()
        //  -> response[1] is the counter
        if (response[1] > limitAmount) {
            // console.log(response[1])
            res.json({
                loggedIn: false,
                status: 'try again in another minute',
            })
        } else {
            next()
        }
    }
