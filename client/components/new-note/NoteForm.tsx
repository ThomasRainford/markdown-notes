import { FormControl, FormLabel, Input, FormErrorMessage, Button, Link } from '@chakra-ui/react'
import router from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseQueryState } from 'urql'
import { NoteUpdateInput, NoteLocationInput, NoteInput, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation, MeQuery } from '../../generated/graphql'
import register from '../../pages/account/register'
import { NoteLocation } from '../../types/types'
import AutoResizeTextarea from '../AutoResizeTextArea'
import GoBackAlertDialog from './GoBackAlertDialog'
import SaveAlertDialog from './SaveAlertDialog'

interface Props {
   user: UseQueryState<MeQuery, object>
   location: NoteLocation
   setLocation: React.Dispatch<React.SetStateAction<NoteLocation>>
}

const NoteForm: React.FC<Props> = ({ user, location, setLocation }) => {

   const router = useRouter()

   const { handleSubmit, errors, register, formState } = useForm()
   const [saved, setSaved] = useState<boolean>(false)

   const [addNoteResult, addNoteMutation] = useAddNoteMutation()
   const [updateNoteResult, updateNoteMutation] = useUpdateNoteMutation()
   const [deleteNoteResult, deleteNoteMutation] = useDeleteNoteMutation()

   const [isGoBackOpen, setIsGoBackOpen] = useState<boolean>(false)
   const onGoBackClose = () => setIsGoBackOpen(false)
   const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
   const onSaveClose = () => setIsSaveOpen(false)


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
               noteId: localStorage.getItem('noteId')
            }

            const response = await updateNoteMutation({ noteLocation, noteInput })
            console.log(response)
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

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>

            <FormControl mb="5%" mt="2%">
               <FormLabel>Title</FormLabel>
               <Input
                  name="title"
                  placeholder="Title"
                  autoComplete="off"
                  ref={register({ required: true })}
                  size="lg"
               />
               <FormErrorMessage>
                  {errors.title && errors.title.message}
               </FormErrorMessage>
            </FormControl>

            <FormControl mb="5%">
               <FormLabel>Body</FormLabel>
               <AutoResizeTextarea ref={register({ required: true })} />
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

         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} user={user} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />
      </>
   )
}

export default NoteForm
