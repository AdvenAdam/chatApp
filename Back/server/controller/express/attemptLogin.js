const pool = require('../../../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSign } = require('../jwt/jwtAuth')
const { json } = require('express')
require('dotenv').config()

const attemptLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await pool.query(
            'SELECT id, username, passhash, userid FROM users WHERE username = $1',
            [username]
        )

        if (user.rowCount > 0) {
            const isSamePass = await bcrypt.compare(
                password,
                user.rows[0].passhash
            )
            // * set session here
            if (isSamePass) {
                jwtSign(
                    {
                        username,
                        id: user.rows[0].id,
                        userid: user.rows[0].userid,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1min' }
                )
                    .then((token) => {
                        res.json({ loggedIn: true, token })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.json({
                            loggedIn: false,
                            status: 'Try Again Later ',
                        })
                    })
            } else {
                res.json({
                    loggedIn: false,
                    status: 'Wrong username or password!',
                })
            }
        } else {
            res.json({ loggedIn: false, status: 'Wrong username or password!' })
        }
    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ loggedIn: false, status: 'An error occurred' })
    }
}

module.exports = attemptLogin
