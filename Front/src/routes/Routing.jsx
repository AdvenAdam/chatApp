import { Route, Routes } from 'react-router-dom'
import Login from '../components/login/Login'
import SignUp from '../components/login/SignUp'
import { Text } from '@chakra-ui/react'
import PrivateRoutes from '../components/privateRoutes'
import { useContext } from 'react'
import { AccountContext } from '../components/AccountContext'
import Home from '../components/home/Home'
const Routing = () => {
    const { user } = useContext(AccountContext)
    return user.loggedIn === null ? (
        <Text>Loading ....</Text>
    ) : (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route path="*" element={<Login />} />
        </Routes>
    )
}
export default Routing
