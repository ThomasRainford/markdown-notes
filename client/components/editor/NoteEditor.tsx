import React, { useContext, useEffect, useState } from 'react'
import MDEditor, { commands, ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css';
import { Flex, FormControl, IconButton, Input, Link } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { MeQuery, Note, NoteInput, NoteLocationInput, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../../generated/graphql';
import { AiOutlineSave } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { NoteContext } from '../../context/NoteContext';
import { useRouter } from 'next/router';
import { UseQueryState } from 'urql';
import { NoteLocation, ExactNoteLocation } from '../../types/types';
import GoBackAlertDialog from './GoBackAlertDialog';
import SaveAlertDialog from './SaveAlertDialog';
import { MDEditorCommands } from '../../utils/MDEditorCommands';

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
   const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight * 0.8)

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

   const didFindNote = (): boolean => {
      const note = localStorage.getItem('note')
      if (!note || note === "undefined") {
         return false;
      }
      return true
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

   const onSubmit = async (_noteInput: NoteInput) => {
      const noteInput = { title: _noteInput.title, body } as NoteInput
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))
      // Update note if already saved.
      if (didFindNote()) {
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
         //if (!localStorage.getItem('note')) {
         const response = await addNoteMutation({
            listLocation: {
               collectionId: location.collection.id,
               listId: location.list.id
            },
            noteInput: noteInputAdd
         })

         updateSelectedNoteLocation(response.data?.addNote.note as Note)
         localStorage.setItem('note', JSON.stringify(response.data?.addNote.note))
         // }
      }
   }

   useEffect(() => {
      if (!selectedNoteLocation) {
         selectNoteLocation({
            noteLocation: {
               collection: location.collection,
               list: location.list,
               note: didFindNote() ? JSON.parse(localStorage.getItem('note')) as Note : null
            }
         })
      }

      if (selectedNoteLocation?.noteLocation.note) {
         setValue('title', selectedNoteLocation.noteLocation.note.title)
         setValue('body', selectedNoteLocation.noteLocation.note.body)
         setTitle(selectedNoteLocation.noteLocation.note.title)
         setBody(selectedNoteLocation.noteLocation.note.body)
      }
   }, [selectedNoteLocation])

   window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight * 0.8)
   })

   return (
      <>
         <Flex direction="column" px="1em" pb="1em" h="100%">
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
                     onClick={() => {
                        setSaved(true)
                     }}
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
                     //ref={register({ required: true })}
                     value={body}
                     height={windowHeight}
                     onChange={setBody}
                     commands={MDEditorCommands}
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
