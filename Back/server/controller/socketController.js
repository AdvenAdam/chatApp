const addFriend = require('./socket.io/addFriend')
const authorizeUser = require('./socket.io/authorizeuser')
const dm = require('./socket.io/dm')
const initializeUser = require('./socket.io/initializeUser')
const onDisconnect = require('./socket.io/onDisconnect')

module.exports = {
    authorizeUser,
    initializeUser,
    onDisconnect,
    addFriend,
    dm,
}
