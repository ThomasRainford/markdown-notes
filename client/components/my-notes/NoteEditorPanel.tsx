import { Flex, Tooltip, IconButton } from '@chakra-ui/react'
import React from 'react'
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import { Note } from '../../generated/graphql'

interface Props {
   selectedNote: Note
}

const NoteEditorPanel: React.FC<Props> = ({ }) => {
   return (
      <Flex direction="column" align="center" h="100%" w="5em" bg="#5CDB95" borderTop="2px" borderColor="#379683">
         <Flex direction="column" align="center" pt="1em">
            <Tooltip label="Add New Note" placement="left">
               <IconButton
                  aria-label="New Note"
                  icon={<MdAdd />}
                  variant="ghost"
                  colorScheme="black"
                  fontSize="3xl"
                  mb="0.5em"
               />
            </Tooltip>
            <Tooltip label="Edit Note" placement="left">
               <IconButton
                  aria-label="Edit Note"
                  icon={<MdEdit />}
                  variant="ghost"
                  colorScheme="black"
                  fontSize="3xl"
                  mb="0.5em"
               />
            </Tooltip>
            <Tooltip label="Delete Note" placement="left">
               <IconButton
                  aria-label="Delete Note"
                  icon={<MdDelete />}
                  variant="ghost"
                  colorScheme="black"
                  fontSize="3xl"
                  mb="0.5em"
               />
            </Tooltip>
         </Flex>
      </Flex>
   )
}

export default NoteEditorPanel
