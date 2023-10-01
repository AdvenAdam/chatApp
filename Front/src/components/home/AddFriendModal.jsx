/* eslint-disable react/prop-types */
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

import TextField from '../TextField'
import { Form, Formik } from 'formik'
import { AddFriendSchema } from '../lib/ValidationRule'
import { useCallback, useContext, useState } from 'react'
import { FriendContext, SocketContext } from './Home'

const AddFriendModal = ({ isOpen, onClose }) => {
    const [error, setError] = useState('')
    const closeModal = useCallback(() => {
        setError('')
        onClose()
    }, [onClose])
    const { setFriendList } = useContext(FriendContext)
    const { socket } = useContext(SocketContext)
    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Add a Friend</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: '' }}
                    validationSchema={AddFriendSchema}
                    onSubmit={(values) => {
                        socket.emit(
                            'add_friend',
                            values.friendName,
                            ({ errorMsg, done, newFriend }) => {
                                if (done) {
                                    setFriendList((c) => [newFriend, ...c])
                                    closeModal()
                                    return
                                }
                                setError(errorMsg)
                            }
                        )
                    }}
                >
                    <Form>
                        <ModalBody>
                            <Heading
                                as="p"
                                color="red.500"
                                textAlign="center"
                                fontSize="xl"
                            >
                                {error}
                            </Heading>
                            <TextField
                                label="Friend's name"
                                placeholder="Enter Friend's Username"
                                autocompleete="off"
                                name="friendName"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                {'Submit'}
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default AddFriendModal
