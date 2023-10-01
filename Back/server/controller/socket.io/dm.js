const redisClient = require('../../../redis')

const dm = async (socket, message) => {
    // const parsedMessage = { ...message, from: socket.user.userid }
    message.from = socket.user.userid
    //  to.from.content
    const messageStr = [message.to, message.from, message.content].join('.')
    await redisClient.lpush(`chat:${message.to}`, messageStr)
    await redisClient.lpush(`chat:${message.from}`, messageStr)

    socket.to(message.to).emit('dm', message)
}

module.exports = dm
