import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const NoteEditorLayout = ({ children }) => {
   return (
      <Flex direction="column" h="100%" w="100%" bg="brand.100">
         {children}
      </Flex>

   )
}

export default NoteEditorLayout
