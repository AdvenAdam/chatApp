import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import TextField from '../TextField'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useContext, useState } from 'react'
import { AccountContext } from '../AccountContext'
import { LoginSchema } from '../lib/ValidationRule'

const SignUp = () => {
    const { setUser } = useContext(AccountContext)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
                const vals = { ...values }
                action.resetForm()
                fetch('http://localhost:4000/auth/signup', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vals),
                })
                    .catch((err) => {
                        return err
                    })
                    .then((res) => {
                        if (!res || !res.ok || res.status >= 400) {
                            return
                        }
                        return res.json()
                    })
                    .then((data) => {
                        if (data) {
                            setUser({ ...data })
                            if (data.status) {
                                setError(data.status)
                            } else if (data.loggedin) {
                                navigate('/home')
                            }
                        }
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
                <Heading>Sign Up</Heading>
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
                        Create Account
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        leftIcon={<ArrowBackIcon />}
                    >
                        Back
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    )
}
export default SignUp
