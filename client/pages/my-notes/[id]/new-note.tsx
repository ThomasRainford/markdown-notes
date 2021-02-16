import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AutoResizeTextarea from '../../../components/AutoResizeTextArea'
import NewNotePageLayout from '../../../components/new-note/NewNotePageLayout'
import NoteLocationBreadcrumb from '../../../components/new-note/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { Note, NoteInput, NoteLocationInput, NoteUpdateInput, useAddNoteMutation, useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const NewNote = ({ }) => {

   const [location, setLocation] = useState<NoteLocation>()
   const [currentNote, setCurrentNote] = useState<Note>()
   const [saved, setSaved] = useState<boolean>(false)

   const [user] = useMeQuery()
   const [addNoteResult, addNoteMutation] = useAddNoteMutation()

   const { handleSubmit, errors, register, formState } = useForm()

   useIsAuth(user)

   const onSubmit = async (noteInput: NoteUpdateInput) => {
      const { title, body } = noteInput

      if (title.length > 0 && text.length > 0) {
         const listId = location.list.id
         const collectionId = location.collection.id

         const noteLocation: NoteLocationInput = {
            collectionId,
            listId,
            noteId: currentNote.id
         }

         //const response = await executeUpdateNote({ noteLocation, updatedNoteFields })

      } else {
         //setIsSaveOpen(true)
      }
   }

   useEffect(() => {
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))

      const addNote = async () => {
         const noteInput: NoteInput = { title: '', body: '' }
         const response = await addNoteMutation({ listLocation: { collectionId: location.collection.id, listId: location.list.id }, noteInput })
         if (!response.data?.addNote.note) {
            setCurrentNote(response.data?.addNote.note as Note)
         }
      }

      if (location) {
         //addNote()
      }

   }, [setLocation])

   return (
      <>
         { !user.fetching && user.data?.me && location
            ?
            <NewNotePageLayout user={user}>
               <Flex direction="column" h="100%" w="5em" bg="#5CDB95">

               </Flex>
               <Flex direction="column" h="100%" w="100%" bg="#EDF5E1">
                  <NoteLocationBreadcrumb location={location} />
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
                     //onClick={() => handleGoBack()}
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
            </NewNotePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(NewNote)
