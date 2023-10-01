import { io } from 'socket.io-client'

const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL

const socket = (user) =>
    new io(serverUrl, {
        autoConnect: false,
        withCredentials: true,
        auth: {
            token: user.token,
        },
    })

export default socket
