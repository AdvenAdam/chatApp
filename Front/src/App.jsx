import { UserContext } from './components/AccountContext'
import { ToggleColorMode } from './components/ToggleColorMode'
import Views from './routes/Routing'

function App() {
    return (
        <UserContext>
            <Views />
            <ToggleColorMode />
        </UserContext>
    )
}

export default App
