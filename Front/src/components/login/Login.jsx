import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import TextField from '../TextField'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AccountContext } from '../AccountContext'
import { LoginSchema } from '../lib/ValidationRule'

const Login = () => {
    const { setUser } = useContext(AccountContext)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
                const vals = { ...values }
                action.resetForm()
                fetch(`${serverUrl}/auth/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vals),
                })
                    .then((res) => {
                        if (!res.ok || res.status >= 400) {
                            throw new Error(
                                'Request failed with status ' + res.status
                            )
                        }
                        return res.json()
                    })
                    .then((data) => {
                        if (data) {
                            setUser({ ...data })
                            localStorage.setItem('token', data.token)
                            if (data.status) {
                                setError(data.status)
                            } else if (data.loggedIn) {
                                navigate('/home')
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }}
        >
            <VStack
                as={Form}
                w={{ base: '90%', md: '500px' }}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>Log In</Heading>
                <Text as="p" color="red.500">
                    {error}
                </Text>
                <TextField
                    name="username"
                    placeholder="Enter Username"
                    autoComplete="off"
                />
                <TextField
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                />
                <ButtonGroup>
                    <Button type="submit" colorScheme="teal">
                        Log In
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        Create Account
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    )
}
export default Login
