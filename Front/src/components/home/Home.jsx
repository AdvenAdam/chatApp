import { Grid, GridItem, Tabs } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import { createContext, useState } from 'react'
import useSocketSetup from './useSocketSetup'

export const FriendContext = createContext()
export const MessagesContext = createContext()
const Home = () => {
    const [friendList, setFriendList] = useState([])
    const [messages, setMessages] = useState([])
    const [friendIndex, setFriendIndex] = useState(0)
    console.log(friendList)
    useSocketSetup(setFriendList, setMessages)
    return (
        <FriendContext.Provider value={{ friendList, setFriendList }}>
            <Grid
                templateColumns="repeat(10, 1fr)"
                h="100vh"
                as={Tabs}
                onChange={(index) => setFriendIndex(index)}
            >
                <GridItem
                    colSpan={['3', '3', '2']}
                    borderRight="1px solid gray"
                >
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={['7', '7', '8']} maxH="100vh">
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <Chat userid={friendList[friendIndex]?.userid} />
                    </MessagesContext.Provider>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    )
}
export default Home
