import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const NoteDisplayLayout = ({ children }) => {
   return (
      <Flex align="center" direction="column" bg="brand.900" h="100%" w="100%">
         {children}
      </Flex>
   )
}

export default NoteDisplayLayout
