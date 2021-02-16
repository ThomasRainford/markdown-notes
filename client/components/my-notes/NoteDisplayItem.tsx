import { Flex, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { MdArrowForward, MdNote } from 'react-icons/md'
import { NoteContext } from '../../context/NoteContext'
import { Note } from '../../generated/graphql'
import { ExactNoteLocation, NoteLocation } from '../../types/types'

interface Props {
   noteLocation: ExactNoteLocation
}

const NoteDisplayItem: React.FC<Props> = ({ noteLocation }) => {

   const router = useRouter()
   const { selectNoteLocation } = useContext(NoteContext)

   return (
      <Flex
         align="center"
         justify="space-between"
         p="0.5em"
         _hover={{ backgroundColor: "#8EE4AF" }}
         onClick={() => {
            selectNoteLocation(noteLocation)
         }}
      >
         <Flex align="center">
            <Icon as={MdNote} h={5} w={5} mr="0.5em" />
            <Text>{noteLocation.noteLocation.note.title}</Text>
         </Flex>
         <Icon as={MdArrowForward} h={5} w={5} />
      </Flex>
   )
}

export default NoteDisplayItem
