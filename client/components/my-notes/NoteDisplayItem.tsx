import { Flex, Icon, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdArrowForward, MdNote } from 'react-icons/md'
import { NoteContext } from '../../context/NoteContext'
import { Note } from '../../generated/graphql'

interface Props {
   note: Note
}

const NoteDisplayItem: React.FC<Props> = ({ note }) => {

   const { selectNote } = useContext(NoteContext)

   return (
      <Flex
         align="center"
         justify="space-between"
         p="0.5em"
         _hover={{ backgroundColor: "#8EE4AF" }}
         onClick={() => {
            selectNote(note)
         }}
      >
         <Flex align="center">
            <Icon as={MdNote} h={5} w={5} mr="0.5em" />
            <Text>{note.title}</Text>
         </Flex>
         <Icon as={MdArrowForward} h={5} w={5} />
      </Flex>
   )
}

export default NoteDisplayItem
