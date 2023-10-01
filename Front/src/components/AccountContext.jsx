import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const AccountContext = createContext()
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        loggedIn: null,
        token: localStorage.getItem('token'),
    })
    const navigate = useNavigate()
    useEffect(() => {
        // Make the network request here
        fetch(`${serverUrl}/auth/login`, {
            credentials: 'include',
            headers: {
                authorization: `Bearer : ${user.token}`,
            },
        })
            .then((response) => {
                if (!response.ok || response.status >= 400) {
                    console.log(response)
                    throw new Error('Network request failed')
                }
                return response.json() // Assuming the response is JSON
            })
            .then((data) => {
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
