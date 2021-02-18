import { Accordion, ExpandedIndex, Flex, Heading, Text } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import AddDrawer from '../../../components/my-notes/AddDrawer'
import CollectionAccordianItem from '../../../components/my-notes/CollectionAccordianItem'
import FullCollectionsDisplayLayout from '../../../components/my-notes/FullCollectionsDisplayLayout'
import MyNotesPageLayout from '../../../components/my-notes/MyNotesPageLayout'
import NoteDisplayLayout from '../../../components/my-notes/NoteDisplayLayout'
import NoteEditorPanel from '../../../components/my-notes/NoteEditorPanel'
import PageLoadingIndicator from '../../../components/PageLoadingIndicator'
import { NoteContext } from '../../../context/NoteContext'
import { Collection, useCollectionsQuery, useMeQuery } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { COLLECTIONS_QUERY } from '../../../utils/ssr-queries/collections'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()
   const { getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   console.log(selectedNoteLocation)

   const [user] = useMeQuery()
   const [collections] = useCollectionsQuery()

   useIsAuth(user)

   useEffect(() => {
      localStorage.removeItem('noteId')
   }, [])

   return (
      <>
         {!user.fetching && user.data?.me
            ?
            <MyNotesPageLayout user={user}>
               <FullCollectionsDisplayLayout>
                  <Text fontStyle="italic" pb="1em" pl="1em">Your Collections</Text>
                  {!collections.fetching && collections.data?.collections &&
                     <Accordion
                        px="1em"
                        textColor="#05368B"
                        defaultIndex={parseInt(localStorage.getItem('collectionIndex'))}
                        onChange={(expandedIndex: ExpandedIndex) => {
                           localStorage.setItem('collectionIndex', expandedIndex.toString())
                           localStorage.removeItem('listIndex')
                        }}
                     >
                        {collections.data?.collections.map((collection: Collection) => (
                           <CollectionAccordianItem key={collection.id} collection={collection} />
                        ))
                        }
                     </Accordion>
                  }
                  <AddDrawer
                     openButtonText="New Collection"
                     header="Create New Collection"
                  />
               </FullCollectionsDisplayLayout>
               <NoteDisplayLayout>
                  <Flex w="100%" pt="1em" px="1em">
                     <Heading textColor="#05386B">
                        {selectedNoteLocation?.noteLocation.note ? selectedNoteLocation.noteLocation.note.title : "Select a Note"}
                     </Heading>
                  </Flex>
                  <Flex direction="column" w="100%" p="2em" whiteSpace="pre-wrap">
                     <ReactMarkdown children={selectedNoteLocation?.noteLocation.note && selectedNoteLocation.noteLocation.note.body} />
                  </Flex>
               </NoteDisplayLayout>
               {selectedNoteLocation?.noteLocation.note &&
                  <NoteEditorPanel user={user} selectedNoteLocation={selectedNoteLocation} />
               }
            </MyNotesPageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export async function getServerSideProps() {
   const ssrCache = ssrExchange({ isClient: false })
   const client = initUrqlClient({
      url: 'http://localhost:3000/graphql',
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
   }, true)

   // This query is used to populate the cache for the query
   // used on this page.
   await client.query(COLLECTIONS_QUERY).toPromise()

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData(),
      },
   }
}

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(MyNotes)