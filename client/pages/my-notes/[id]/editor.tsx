import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import EditPanel from '../../../components/editor/EditPanel'
import NewNotePageLayout from '../../../components/editor/NewNotePageLayout'
import NoteEditorLayout from '../../../components/editor/NoteEditorLayout'
import NoteForm from '../../../components/editor/NoteForm'
import NoteLocationBreadcrumb from '../../../components/editor/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { NoteContext } from '../../../context/NoteContext'
import { useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const Editor = ({ }) => {

   const router = useRouter()

   const [location, setLocation] = useState<NoteLocation>()

   const { getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   const [user] = useMeQuery()

   useIsAuth(user)

   useEffect(() => {
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))
   }, [])

   return (
      <>
         { !user.fetching && user.data?.me && location
            ?
            <NewNotePageLayout user={user}>
               <EditPanel />
               <NoteEditorLayout>
                  <NoteLocationBreadcrumb location={location} />
                  <NoteForm user={user} location={location} setLocation={setLocation} selectedNoteLocation={selectedNoteLocation} />
               </NoteEditorLayout>
            </NewNotePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Editor)
