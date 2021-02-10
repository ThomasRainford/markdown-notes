import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const ActivityDisplayLayout = ({ children }) => {
   return (
      <Flex align="center" direction="column" bg="#EDF5E1" h="100%" w="100%">
         {children}
      </Flex>
   )
}

export default ActivityDisplayLayout
