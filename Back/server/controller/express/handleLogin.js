const { jwtVerify, getJwt } = require('../jwt/jwtAuth')
require('dotenv').config()
const handleLogin = async (req, res) => {
    const token = getJwt(req)
    if (token.length === 1) {
        console.log('bzzz', token.length)
        res.json({ loggedIn: false, message: 'no Token' })
        return
    } else {
        jwtVerify(token, process.env.JWT_SECRET)
            .then(() => {
                res.json({ loggedIn: true, token })
            })
            .catch((err) => {
                console.log(err)
                res.json({ loggedIn: false })
            })
    }
}

module.exports = handleLogin
