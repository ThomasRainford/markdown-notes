import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const FullCollectionsDisplayLayout = ({ children }) => {
   return (
      <Flex direction="column" h="100%" w="25em" bg="brand.100" textColor="brand.800">
         {children}
      </Flex >
   )
}

export default FullCollectionsDisplayLayout
