import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const ToggleColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Button
            onClick={toggleColorMode}
            pos="absolute"
            top="0"
            right="0"
            m="1rem"
        >
            {colorMode === 'dark' ? (
                <SunIcon color="yellow.500" />
            ) : (
                <MoonIcon color="yellow.500" />
            )}
        </Button>
    )
}
