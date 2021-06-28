import React, { useContext, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css';
import { Flex, FormControl, IconButton, Input, Link, Switch, Text } from '@chakra-ui/react';
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
import { useAutosave } from "react-autosave";

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

const NoteEditor: React.FC<Props> = ({ user, location, setLocation, selectedNoteLocation }) => {

   const router = useRouter()

   const { selectNoteLocation } = useContext(NoteContext)

   const { handleSubmit, formState, setValue } = useForm<FormValues>()

   const [autosave, setAutoSave] = useState<boolean>(false)

   const [note, setNote] = useState<FormValues>({
      title: selectedNoteLocation.noteLocation.note.title,
      body: selectedNoteLocation.noteLocation.note.body
   })

   const [saved, setSaved] = useState<boolean>(true)
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
      const noteInput = { title: _noteInput.title, body: _noteInput.body }
      console.log(noteInput)
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))
      // Update note if already saved.
      if (didFindNote()) {
         if (noteInput.title.length > 0 && noteInput.body.length > 0) {
            console.log(selectedNoteLocation)
            const noteLocation: NoteLocationInput = {
               collectionId: selectedNoteLocation.noteLocation.collection.id,
               listId: selectedNoteLocation.noteLocation.list.id,
               noteId: selectedNoteLocation.noteLocation.note.id
            }

            const response = await updateNoteMutation({ noteLocation, noteInput })
            updateSelectedNoteLocation(response.data?.updateNote.note as Note)
            localStorage.setItem('note', JSON.stringify(response.data?.updateNote.note))
         } else {
            setIsSaveOpen(true)
         }

         // Add note if no note yet saved.
      } else {
         const noteInputAdd: NoteInput = { title: noteInput.title, body: noteInput.body }
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

   // Set the size of the MD editor when the window is resized.
   window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight * 0.8)
   })
   console.log("change")

   // Function for saving note automatically.
   const updateNote = React.useCallback(async (note: FormValues) => {
      setSaved(true)
      console.log(note)
      await onSubmit({ title: note.title, body: note.body })
   }, [])

   useAutosave({ data: note, onSave: updateNote, interval: 3000 })

   const setBody = (value: string) => {
      setNote({ ...note, body: value })
   }

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
                     mr="1em"
                     onClick={() => {
                        setSaved(true)
                     }}
                  >
                     Save
                  </IconButton>
                  <Flex alignItems="center">
                     <Text pr="0.5em" fontWeight="bold" color="brand.900" mb="0">
                        AutoSave
                     </Text>
                     <Switch
                        isChecked={autosave}
                        onChange={() => {
                           setAutoSave(!autosave)
                           console.log(autosave)
                        }}
                     />
                  </Flex>
               </Flex>
               <FormControl mb="1em">
                  <Input
                     value={note.title}
                     name="title"
                     placeholder="Title"
                     autoComplete="off"
                     //ref={register({ required: true })}
                     size="lg"
                     border="1px"
                     borderColor="#5CDB95"
                     bg="brand.900"
                     onChange={(event: any) => {
                        setNote({ ...note, title: event.target.value })
                     }}
                  />
               </FormControl>
               <FormControl mb="1em">
                  <MDEditor
                     value={note.body}
                     height={windowHeight}
                     onChange={setBody}
                     commands={MDEditorCommands}
                  />
                  {/* {autosave && <Autosave data={{ title, body }} onSave={updateNote} interval={3000} />} */}
               </FormControl>
            </form>
         </Flex>
         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} user={user} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />
      </>
   )
}

export default NoteEditor
