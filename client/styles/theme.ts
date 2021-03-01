import { extendTheme } from '@chakra-ui/react'

const colors = {
   brand: {
      100: "#23272F",
      200: "#177E89",
      300: "#00B2FF",
      400: "#4299E1",
      800: "#E2E8F0",
      900: "#FFFBFE",
   }
}

const customTheme = extendTheme({ colors })

export default customTheme