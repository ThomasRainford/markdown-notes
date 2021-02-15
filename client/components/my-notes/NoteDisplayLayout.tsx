import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const NoteDisplayLayout = ({ children }) => {
   return (
      <Flex align="center" direction="column" bg="#EDF5E1" h="100%" w="100%"
         borderTop="2px"
         borderLeft="2px"
         borderColor="#379683"
      >
         {children}
      </Flex>
   )
}

export default NoteDisplayLayout
