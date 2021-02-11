import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Note } from '../../generated/graphql'

interface Props {
   note: Note
}

const NoteDisplayItem: React.FC<Props> = ({ note }) => {
   return (
      <Flex mb="1em">
         <Text>{note.title}</Text>
      </Flex>
   )
}

export default NoteDisplayItem
