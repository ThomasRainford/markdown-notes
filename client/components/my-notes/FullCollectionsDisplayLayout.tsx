import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const FullCollectionsDisplayLayout = ({ children }) => {
   return (
      <Flex direction="column" h="100%" w="25em" bg="#5CDB95" textColor="#05386B">
         {children}
      </Flex>
   )
}

export default FullCollectionsDisplayLayout