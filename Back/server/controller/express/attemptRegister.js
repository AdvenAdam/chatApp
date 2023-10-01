const pool = require('../../../db')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const attemptRegister = async (req, res) => {
    try {
        const { username, password } = req.body

        const existingUser = await pool.query(
            'SELECT username FROM users WHERE username = $1',
            [username]
        )
        if (existingUser.rowCount > 0) {
            return res
                .status(400)
                .json({ loggedIn: false, message: 'Invalid credentials' })
        }

        const hashedpass = await bcrypt.hash(password, 10)

        const newUserQuery = await pool.query(
            'INSERT INTO users (username, passhash, userid) VALUES ($1, $2, $3) RETURNING id, username, userid',
            [username, hashedpass, uuidv4()]
        )

        jwtSign(
            {
                id: newUserQuery.rows[0].id,
                username: newUserQuery.rows[0].username,
                userid: newUserQuery.rows[0].userid,
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

        res.status(201).json({ loggedIn: true, username })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = attemptRegister
