import { extendTheme } from "@chakra-ui/react"

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true
  },
  styles: {
    global: {
      body: {
        margin: 0,
        "fontFamily":
          "-apple-system, BlinkSystemFont, 'Sagoe UI', 'Roboto, 'Oxygen','Ubuntu','cantarell','Fira Sans','Helvetica Neue', sans-serif",
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale",
      },
      code: {
        "fontFamily":
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New'monospace",
      }
    }
  }
}

export default extendTheme(theme)