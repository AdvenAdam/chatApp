const pool = require('../../../db')
const bcrypt = require('bcrypt')

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
                req.session.user = {
                    username,
                    id: user.rows[0].id,
                    userid: user.rows[0].userid,
                }

                res.json({ loggedIn: true, username })
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
