
import React, { useContext, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css';
import { Button, Flex, FormControl, FormErrorMessage, IconButton, Input, Link } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { MeQuery, Note, NoteInput, NoteLocationInput, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../../generated/graphql';
import { SearchIcon } from '@chakra-ui/icons';
import { AiOutlineSave } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { NoteContext } from '../../context/NoteContext';
import { useRouter } from 'next/router';
import { UseQueryState } from 'urql';
import { NoteLocation, ExactNoteLocation } from '../../types/types';
import GoBackAlertDialog from './GoBackAlertDialog';
import SaveAlertDialog from './SaveAlertDialog';

type FormValues = {
   title: string
   body: string
}


interface Props {
   user: UseQueryState<MeQuery, object>
   location: NoteLocation
   setLocation: React.Dispatch<React.SetStateAction<NoteLocation>>
   selectedNoteLocation: ExactNoteLocation
}

const NoteEditor: React.FC<Props> = ({ user, location, setLocation }) => {

   const router = useRouter()

   const { selectNoteLocation, getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   const { handleSubmit, errors, register, formState, setValue } = useForm<FormValues>()
   const [title, setTitle] = useState<string>("")
   const [body, setBody] = useState<string>("") // This is used to pass to the markdown component.

   const [saved, setSaved] = useState<boolean>(false)

   const [isGoBackOpen, setIsGoBackOpen] = useState<boolean>(false)
   const onGoBackClose = () => setIsGoBackOpen(false)
   const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
   const onSaveClose = () => setIsSaveOpen(false)

   const [, addNoteMutation] = useAddNoteMutation()
   const [, updateNoteMutation] = useUpdateNoteMutation()
   const [, deleteNoteMutation] = useDeleteNoteMutation()

   const updateSelectedNoteLocation = (note: Note) => {
      selectNoteLocation({
         noteLocation: {
            collection: selectedNoteLocation.noteLocation.collection,
            list: selectedNoteLocation.noteLocation.list,
            note
         }
      })
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

   const onSubmit = async (noteInput: NoteInput) => {
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

   useEffect(() => {
      if (!selectedNoteLocation) {
         selectNoteLocation({
            noteLocation: {
               collection: location.collection,
               list: location.list,
               note: localStorage.getItem('note') !== "undefined" ? JSON.parse(localStorage.getItem('note')) as Note : null
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
         <Flex direction="column" p="1em">
            <form onSubmit={handleSubmit(onSubmit)}>
               <Flex mb="1em">
                  <IconButton
                     icon={<BiArrowBack />}
                     aria-label="Search database"
                     colorScheme="teal"
                     as={Link}
                     mr="1em"
                     onClick={() => handleGoBack()}
                  >
                     Go Back
                  </IconButton>
                  <IconButton
                     icon={<AiOutlineSave />}
                     aria-label="Search database"
                     colorScheme="blue"
                     isLoading={formState.isSubmitting}
                     type="submit"
                     onClick={() => setSaved(true)}
                  >
                     Save
                  </IconButton>
               </Flex>
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
                     onChange={(event: any) => {
                        setTitle(event.target.value as string)
                     }}
                  />
               </FormControl>
               <FormControl mb="1em">
                  <MDEditor
                     value={body}
                     height={window.innerHeight * 0.8}
                     onChange={setBody}
                  />
               </FormControl>
            </form>
         </Flex>
         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} user={user} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />
      </>
   )
}

export default NoteEditor
