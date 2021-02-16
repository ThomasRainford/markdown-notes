import { Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useEffect, useState } from 'react'
import NewNotePageLayout from '../../../components/new-note/NewNotePageLayout'
import NoteLocationBreadcrumb from '../../../components/new-note/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { Collection, NoteLocationInput, NotesList, useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const NewNote = ({ }) => {

   const [location, setLocation] = useState<NoteLocation>()

   const [user] = useMeQuery()

   useIsAuth(user)

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
               <Flex h="100%" w="100%" bg="#EDF5E1">
                  <NoteLocationBreadcrumb location={location} />
               </Flex>
            </NewNotePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(NewNote)
