import { Button, HStack, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import socket from '../../socket'
import { useContext } from 'react'
import { MessagesContext } from './Home'

const ChatBox = ({ userid }) => {
    const { setMessages } = useContext(MessagesContext)

    const handleSubmit = async (values, action) => {
        const message = {
            to: userid,
            from: null,
            content: values.message,
        }

        socket.emit('dm', message)

        setMessages((prevMsgs) => [message, ...prevMsgs])

        action.resetForm()
    }

    return (
        <Formik
            initialValues={{ message: '' }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255),
            })}
            onSubmit={handleSubmit}
        >
            <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
                <Input
                    as={Field}
                    name="message"
                    placeholder="Type message here.."
                    size="lg"
                    autoComplete="off"
                />
                <Button type="submit" size="lg" colorScheme="teal">
                    Send
                </Button>
            </HStack>
        </Formik>
    )
}
ChatBox.propTypes = {
    userid: PropTypes.string,
}
export default ChatBox
