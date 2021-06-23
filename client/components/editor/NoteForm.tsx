import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { UseQueryState } from 'urql'
import { NoteContext } from '../../context/NoteContext'
import { MeQuery, Note, NoteInput, NoteLocationInput, NoteUpdateInput, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../../generated/graphql'
import { ExactNoteLocation, NoteLocation } from '../../types/types'
import AutoResizeTextarea from '../AutoResizeTextArea'
import MarkdownSyntaxHighligher from '../MarkdownSyntaxHighligher'
import GoBackAlertDialog from './GoBackAlertDialog'
import SaveAlertDialog from './SaveAlertDialog'
import gfm from 'remark-gfm'
import EditPanel from './EditPanel'

interface Props {
   user: UseQueryState<MeQuery, object>
   location: NoteLocation
   setLocation: React.Dispatch<React.SetStateAction<NoteLocation>>
   selectedNoteLocation: ExactNoteLocation
}

const NoteForm: React.FC<Props> = ({ user, location, setLocation }) => {

   const router = useRouter()

   const { selectNoteLocation, getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   const { handleSubmit, errors, register, formState, setValue } = useForm()
   const [saved, setSaved] = useState<boolean>(false)
   const [body, setBody] = useState<string>() // This is used to pass to the markdown component.

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
      if (localStorage.getItem('note')) {
         if (title.length > 0 && body.length > 0) {

            const noteLocation: NoteLocationInput = {
               collectionId: selectedNoteLocation.noteLocation.collection.id,
               listId: selectedNoteLocation.noteLocation.list.id,
               noteId: selectedNoteLocation.noteLocation.note.id
            }

            const response = await updateNoteMutation({ noteLocation, noteInput })
            updateSelectedNoteLocation(response.data?.updateNote.note as Note)
         } else {
            setIsSaveOpen(true)
         }

         // Add note if no note yet saved.
      } else {
         const noteInputAdd: NoteInput = { title: noteInput.title, body: noteInput.body }
         if (!localStorage.getItem('note')) {
            const response = await addNoteMutation({
               listLocation: {
                  collectionId: location.collection.id,
                  listId: location.list.id
               },
               noteInput: noteInputAdd
            })

            updateSelectedNoteLocation(response.data?.addNote.note as Note)
            localStorage.setItem('note', JSON.stringify(response.data?.addNote.note))
         }
      }
   }

   const handleGoBack = async () => {
      if (!saved) {
         setIsGoBackOpen(true)
      } else {
         localStorage.removeItem('note')
         router.replace(`/my-notes/${user.data?.me?.username}`)
      }
   }

   const deleteNote = async () => {
      const collectionId = location.collection.id
      const listId = location.list.id

      const noteLocationInput: NoteLocationInput = {
         collectionId,
         listId,
         noteId: (JSON.parse(localStorage.getItem('note')) as Note).id
      }

      if (location) {
         const response = await deleteNoteMutation({ noteLocationInput })
      }
   }

   useEffect(() => {

      if (!selectedNoteLocation) {
         selectNoteLocation({
            noteLocation: {
               collection: location.collection,
               list: location.list,
               note: JSON.parse(localStorage.getItem('note')) as Note
            }
         })
      }

      if (selectedNoteLocation?.noteLocation.note) {
         setValue('title', selectedNoteLocation.noteLocation.note.title)
         setValue('body', selectedNoteLocation.noteLocation.note.body)
         setBody(selectedNoteLocation.noteLocation.note.body)
      }
   }, [selectedNoteLocation])

   return (
      <>
         <Flex
            w="100%"
            h="100%"
            mx="auto"
         >
            <Flex
               direction="column"
               align="center"
               w="50%"
               h="100%"
               bg="brand.100"
            >
               <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%", width: "100%", padding: "1em", paddingTop: "0em" }}>

                  <FormControl mb="1em">
                     <Input
                        name="title"
                        placeholder="Title"
                        autoComplete="off"
                        ref={register({ required: true })}
                        size="lg"
                        border="1px"
                        borderColor="#5CDB95"
                        bg="brand.900"
                     />
                     <FormErrorMessage>
                        {errors.title && errors.title.message}
                     </FormErrorMessage>
                  </FormControl>

                  <FormControl mb="1em">
                     <EditPanel />
                     <AutoResizeTextarea
                        ref={register({ required: true })}
                        placeholder="Body"
                        border="1px"
                        borderColor="#5CDB95"
                        p="0.5em"
                        bg="brand.900"
                        onChange={(event) => setBody(event.target.value as string)}
                     />
                     <FormErrorMessage>
                        {errors.body && errors.body.message}
                     </FormErrorMessage>
                  </FormControl>

                  <Button
                     colorScheme="teal"
                     mr="1em"
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
            <Flex
               direction="column"
               w="50%"
               h="100%"
               p="1em"
               bg="brand.900"
               whiteSpace="pre-wrap"
            >
               <ReactMarkdown
                  children={body}
                  plugins={[gfm]}
               //renderers={{ code: MarkdownSyntaxHighligher }}
               />
            </Flex>
            <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} user={user} />
            <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />
         </Flex>
      </>
   )
}

export default NoteForm
