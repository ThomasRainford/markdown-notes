import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import EditPanel from '../../../components/new-note/EditPanel'
import NewNotePageLayout from '../../../components/new-note/NewNotePageLayout'
import NoteEditorLayout from '../../../components/new-note/NoteEditorLayout'
import NoteForm from '../../../components/new-note/NoteForm'
import NoteLocationBreadcrumb from '../../../components/new-note/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { useAddNoteMutation, useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const Editor = ({ }) => {

   const router = useRouter()

   const [location, setLocation] = useState<NoteLocation>()

   const [user] = useMeQuery()
   const [, addNoteMutation] = useAddNoteMutation()

   useIsAuth(user)

   useEffect(() => {
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))

   }, [router, addNoteMutation])

   return (
      <>
         { !user.fetching && user.data?.me && location
            ?
            <NewNotePageLayout user={user}>
               <EditPanel />
               <NoteEditorLayout>
                  <NoteLocationBreadcrumb location={location} />
                  <NoteForm user={user} location={location} setLocation={setLocation} />
               </NoteEditorLayout>
            </NewNotePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Editor)
