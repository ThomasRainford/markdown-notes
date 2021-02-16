import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OperationResult, UseQueryState } from 'urql'
import { NoteContext } from '../../context/NoteContext'
import { AddNoteMutation, Exact, MeQuery, Note, NoteInput, NoteLocationInput, NoteUpdateInput, UpdateNoteMutation, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../../generated/graphql'
import { ExactNoteLocation, NoteLocation } from '../../types/types'
import AutoResizeTextarea from '../AutoResizeTextArea'
import GoBackAlertDialog from './GoBackAlertDialog'
import SaveAlertDialog from './SaveAlertDialog'

interface Props {
   user: UseQueryState<MeQuery, object>
   location: NoteLocation
   setLocation: React.Dispatch<React.SetStateAction<NoteLocation>>
   selectedNoteLocation: ExactNoteLocation
}

const NoteForm: React.FC<Props> = ({ user, location, setLocation, selectedNoteLocation }) => {

   const router = useRouter()

   const { selectNoteLocation } = useContext(NoteContext)

   const { handleSubmit, errors, register, formState, setValue } = useForm()
   const [saved, setSaved] = useState<boolean>(false)

   const [, addNoteMutation] = useAddNoteMutation()
   const [, updateNoteMutation] = useUpdateNoteMutation()
   const [, deleteNoteMutation] = useDeleteNoteMutation()

   const [isGoBackOpen, setIsGoBackOpen] = useState<boolean>(false)
   const onGoBackClose = () => setIsGoBackOpen(false)
   const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
   const onSaveClose = () => setIsSaveOpen(false)

   const updateSelectedNoteLocation = (note: Note) => {
      selectNoteLocation({
         noteLocation: {
            collection: selectedNoteLocation.noteLocation.collection,
            list: selectedNoteLocation.noteLocation.list,
            note
         }
      })
   }


   const onSubmit = async (noteInput: NoteUpdateInput) => {
      const { title, body } = noteInput
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))

      // Update note if already saved.
      if (localStorage.getItem('noteId')) {
         if (title.length > 0 && body.length > 0) {
            const listId = location.list.id
            const collectionId = location.collection.id

            const noteLocation: NoteLocationInput = {
               collectionId,
               listId,
               noteId: selectedNoteLocation.noteLocation.note.id
            }

            const response = await updateNoteMutation({ noteLocation, noteInput })
            console.log(response)
            updateSelectedNoteLocation(response.data?.updateNote.note as Note)
         } else {
            setIsSaveOpen(true)
         }

         // Add note if no note yet saved.
      } else {
         const noteInputAdd: NoteInput = { title: noteInput.title, body: noteInput.body }
         if (!localStorage.getItem('noteId')) {
            const response = await addNoteMutation({
               listLocation: {
                  collectionId: location.collection.id,
                  listId: location.list.id
               },
               noteInput: noteInputAdd
            })
            updateSelectedNoteLocation(response.data?.addNote.note as Note)
            localStorage.setItem('noteId', response.data?.addNote.note.id)
         }
      }
   }

   const handleGoBack = async () => {
      if (!saved) {
         setIsGoBackOpen(true)
      } else {
         localStorage.removeItem('noteId')
         router.replace(`/my-notes/${user.data?.me?.username}`)
      }
   }

   const deleteNote = async () => {
      const collectionId = location.collection.id
      const listId = location.list.id

      const noteLocationInput: NoteLocationInput = {
         collectionId,
         listId,
         noteId: localStorage.getItem('noteId')
      }

      if (location) {
         const response = await deleteNoteMutation({ noteLocationInput })
      }
   }

   useEffect(() => {
      if (selectedNoteLocation) {
         setValue('title', selectedNoteLocation.noteLocation.note.title)
         setValue('body', selectedNoteLocation.noteLocation.note.body)
      }
   }, [])

   return (
      <>
         <Flex direction="column" justify="center" align="center" w="60em" mx="auto" mt="3em" border="2px" borderColor="#5CDB95" boxShadow="lg">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", padding: "2em" }}>

               <FormControl mb="5%" mt="2%">
                  <FormLabel>Title</FormLabel>
                  <Input
                     name="title"
                     autoComplete="off"
                     ref={register({ required: true })}
                     size="lg"
                     border="1px"
                     borderColor="#5CDB95"
                  />
                  <FormErrorMessage>
                     {errors.title && errors.title.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl mb="5%">
                  <FormLabel>Body</FormLabel>
                  <AutoResizeTextarea ref={register({ required: true })} border="1px" borderColor="#5CDB95" p="0.5em" />
                  <FormErrorMessage>
                     {errors.body && errors.body.message}
                  </FormErrorMessage>
               </FormControl>

               <Button
                  colorScheme="teal"
                  mr="1%"
                  as={Link}
                  onClick={() => handleGoBack()}
               >
                  Go Back
               </Button>
               <Button
                  colorScheme="blue"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  onClick={() => setSaved(true)}
               >
                  Save
               </Button>

            </form>
         </Flex>
         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} user={user} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />

      </>
   )
}

export default NoteForm
