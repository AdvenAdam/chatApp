import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const AccountContext = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null })
    const navigate = useNavigate()
    useEffect(() => {
        // Make the network request here
        fetch('http://localhost:4000/auth/login', {
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok || response.status >= 400) {
                    throw new Error('Network request failed')
                }
                return response.json() // Assuming the response is JSON
            })
            .then((data) => {
                // console.log({ Contextdata: data })
                if (data.loggedIn) {
                    navigate('/home')
                } else {
                    navigate('/')
                }
                setUser(data)
            })
            .catch((error) => {
                setUser({ loggedIn: false })
                console.error(error)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array means this effect runs once on component mount

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
}

UserContext.propTypes = {
    children: PropTypes.node,
}

export { AccountContext, UserContext }
