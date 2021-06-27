import { Flex, IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { OperationResult, UseQueryState } from 'urql'
import { NoteContext } from '../../context/NoteContext'
import { DeleteNoteMutation, Exact, MeQuery, Note, NoteLocationInput, useDeleteNoteMutation } from '../../generated/graphql'
import { ExactNoteLocation } from '../../types/types'

interface Props {
   user: UseQueryState<MeQuery, object>
   selectedNoteLocation: ExactNoteLocation
}

const NoteEditorPanel: React.FC<Props> = ({ user, selectedNoteLocation }) => {

   const router = useRouter()

   const toast = useToast()

   const { selectNoteLocation } = useContext(NoteContext)

   const [, deleteNoteMutation] = useDeleteNoteMutation()

   const displayToast = (response: OperationResult<DeleteNoteMutation, Exact<{
      noteLocationInput: NoteLocationInput;
   }>>) => {
      if (!response.data?.deleteNote || response.error) {
         toast({
            title: "Unable to Delete Note.",
            description: "There was a problem when deleting the note.",
            status: "error",
            duration: 2000,
            isClosable: true,
         })
      } else {
         toast({
            title: "Note Deleted",
            description: "Note was successfully deleted.",
            status: "success",
            duration: 2000,
            isClosable: true,
         })
      }
   }

   return (
      <Flex direction="column" align="center" w="5em" bg="brand.100">
         <Flex direction="column" align="center">
            <Tooltip label="Edit Note" placement="left">
               <IconButton
                  aria-label="Edit Note"
                  color="brand.300"
                  icon={<MdEdit />}
                  variant="ghost"
                  fontSize="3xl"
                  mb="0.5em"
                  onClick={() => {
                     localStorage.setItem('note', JSON.stringify(selectedNoteLocation.noteLocation.note))
                     selectNoteLocation(selectedNoteLocation)
                     localStorage.setItem('noteLocation', JSON.stringify({
                        collection: selectedNoteLocation.noteLocation.collection,
                        list: selectedNoteLocation.noteLocation.list
                     }))
                     router.push(router.asPath + '/editor')
                  }}
               />
            </Tooltip>
            <Tooltip label="Delete Note" placement="left">
               <IconButton
                  aria-label="Delete Note"
                  color="brand.300"
                  icon={<MdDelete />}
                  variant="ghost"
                  fontSize="3xl"
                  mb="0.5em"
                  onClick={async () => {
                     localStorage.removeItem("note")
                     const response = await deleteNoteMutation({
                        noteLocationInput: {
                           collectionId: selectedNoteLocation.noteLocation.collection.id,
                           listId: selectedNoteLocation.noteLocation.list.id,
                           noteId: selectedNoteLocation.noteLocation.note.id
                        }
                     })

                     displayToast(response)
                     selectNoteLocation(null)
                  }}
               />
            </Tooltip>
         </Flex>
      </Flex>
   )
}

export default NoteEditorPanel
