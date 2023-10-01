import { ChatIcon } from '@chakra-ui/icons'
import {
    Button,
    Circle,
    Divider,
    HStack,
    Heading,
    Tab,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'

import { useContext } from 'react'
import { FriendContext } from './Home'
import AddFriendModal from './AddFriendModal'

const Sidebar = () => {
    const { friendList } = useContext(FriendContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <VStack py="1.4rem">
                <HStack justify="space-evenly" w="100%">
                    <Heading size="md"> Add Friend</Heading>
                    <Button onClick={onOpen}>
                        <ChatIcon />
                    </Button>
                </HStack>
                <Divider />
                <VStack justifyItems="flex-start" align="flex-start">
                    {friendList.map((friend) => (
                        <HStack as={Tab} key={`friend:${friend.username}`}>
                            <Circle
                                bg={friend.connected ? 'cyan.500' : 'red.500'}
                                w="5px"
                                h="5px"
                            />
                            <Text>{friend.username}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
export default Sidebar
