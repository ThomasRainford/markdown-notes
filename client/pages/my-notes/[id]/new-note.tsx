import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import router from 'next/dist/next-server/lib/router/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AutoResizeTextarea from '../../../components/AutoResizeTextArea'
import NewNotePageLayout from '../../../components/new-note/NewNotePageLayout'
import NoteLocationBreadcrumb from '../../../components/new-note/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { Collection, NoteLocationInput, NotesList, NoteUpdateInput, useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'
import register from '../../account/register'

interface Props {

}

const NewNote = ({ }) => {

   const [location, setLocation] = useState<NoteLocation>()
   const [saved, setSaved] = useState<boolean>(false)


   const [user] = useMeQuery()

   const { handleSubmit, errors, register, formState } = useForm()

   useIsAuth(user)

   const onSubmit = async () => {

   }

   useEffect(() => {
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))
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
                        <FormLabel>Text</FormLabel>
                        <AutoResizeTextarea ref={register({ required: true })} />
                        <FormErrorMessage>
                           {errors.text && errors.text.message}
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
