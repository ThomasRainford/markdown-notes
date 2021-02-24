import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const ActivityDisplayLayout = ({ children }) => {
   return (
      <Flex align="center" direction="column" h="100%" w="100%">
         {children}
      </Flex>
   )
}

export default ActivityDisplayLayout