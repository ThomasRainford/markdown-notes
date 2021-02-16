import { Flex, Tooltip, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import { UseQueryState } from 'urql'
import { NoteContext } from '../../context/NoteContext'
import { MeQuery, Note } from '../../generated/graphql'

interface Props {
   user: UseQueryState<MeQuery, object>
   selectedNote: Note
}

const NoteEditorPanel: React.FC<Props> = ({ user, selectedNote }) => {

   const router = useRouter()

   const { selectNote } = useContext(NoteContext)

   return (
      <Flex direction="column" align="center" h="100%" w="5em" bg="#5CDB95" borderTop="2px" borderColor="#379683">
         <Flex direction="column" align="center" pt="1em">
            <Tooltip label="Edit Note" placement="left">
               <IconButton
                  aria-label="Edit Note"
                  icon={<MdEdit />}
                  variant="ghost"
                  colorScheme="black"
                  fontSize="3xl"
                  mb="0.5em"
                  onClick={() => {
                     localStorage.setItem('noteId', selectedNote.id)
                     selectNote(selectedNote)
                     router.push(router.asPath + `/editor`)
                  }}
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
