import { CircularProgress, Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const PageLoadingIndicator = ({ }) => {
   return (
      <Flex height="100vh" width="100vw" justify="center" align="center">
         <CircularProgress isIndeterminate size="100px" />
      </Flex>
   )
}

export default PageLoadingIndicator