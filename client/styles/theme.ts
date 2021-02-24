import { extendTheme } from '@chakra-ui/react'

const colors = {
   brand: {
      100: "#2B303A",
      200: "#177E89",
      900: "#FFFBFE",
   }
}

const customTheme = extendTheme({ colors })

export default customTheme