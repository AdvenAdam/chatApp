const redisClient = require('../../../redis')
const parseFriendList = require('./parseFriendList')

const addFriend = async (socket, friendName, cb) => {
    if (friendName === socket.user.username) {
        cb({ done: false, errorMsg: 'Cannot add self!' })
        return
    }
    const friend = await redisClient.hgetall(`userid:${friendName}`)
    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    )
    const parsedFriendList = await parseFriendList(currentFriendList)
    const usernameExists = parsedFriendList.some(
        (item) => item.username === friendName
    )

    if (usernameExists) {
        cb({ done: false, errorMsg: 'Friend already added!' })
        return
    }

    if (!friend || Object.keys(friend).length === 0) {
        cb({ done: false, errorMsg: "User doesn't exist!" })
        return
    }

    await redisClient.lpush(
        `friends:${socket.user.username}`,
        [friendName, friend.userid].join('.')
    )

    const newFriend = {
        username: friendName,
        userid: friend.userid,
        connected: friend.connected,
    }
    cb({ done: true, newFriend })
}

module.exports = addFriend
