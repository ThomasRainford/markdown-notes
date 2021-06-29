import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import NewNotePageLayout from '../../../components/editor/NewNotePageLayout'
import NoteEditorLayout from '../../../components/editor/NoteEditorLayout'
import NoteLocationBreadcrumb from '../../../components/editor/NoteLocationBreadcrumb'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { NoteContext } from '../../../context/NoteContext'
import { Note, useMeQuery } from '../../../generated/graphql'
import { NoteLocation } from '../../../types/types'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css';
import NoteEditor from '../../../components/editor/NoteEditor'

interface Props {

}

const Editor = ({ }) => {

   const router = useRouter()

   const [location, setLocation] = useState<NoteLocation>()

   const { selectNoteLocation, getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   const [user] = useMeQuery()

   useIsAuth(user)

   const didFindNote = (): boolean => {
      const note = localStorage.getItem('note')
      if (!note || note === "undefined") {
         return false;
      }
      return true
   }

   useEffect(() => {
      setLocation(JSON.parse(localStorage.getItem('noteLocation')))

      const noteLoc = JSON.parse(localStorage.getItem('noteLocation')) as NoteLocation

      if (!selectedNoteLocation) {
         selectNoteLocation({
            noteLocation: {
               collection: noteLoc.collection,
               list: noteLoc.list,
               note: didFindNote() ? JSON.parse(localStorage.getItem('note')) as Note : null
            }
         })
      }
   }, [])

   return (
      <>
         {!user.fetching && user.data?.me && location
            ?
            <NewNotePageLayout user={user}>
               <NoteEditorLayout>
                  <NoteLocationBreadcrumb location={location} />
                  <NoteEditor user={user} location={location} setLocation={setLocation} />
               </NoteEditorLayout>
            </NewNotePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Editor)
