import { Accordion, ExpandedIndex, Flex, Heading, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import CollectionAccordianItem from '../../components/my-notes/CollectionAccordianItem'
import FullCollectionsDisplayLayout from '../../components/my-notes/FullCollectionsDisplayLayout'
import MyNotesPageLayout from '../../components/my-notes/MyNotesPageLayout'
import NoteDisplayLayout from '../../components/my-notes/NoteDisplayLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import NoteProvider, { NoteContext } from '../../context/NoteContext'
import { Collection, useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { COLLECTIONS_QUERY } from '../../utils/ssr-queries/collections'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()
   const { getSelectedNote, selectNote } = useContext(NoteContext)
   const selectedNote = getSelectedNote()

   const [user] = useMeQuery()
   const [collections] = useCollectionsQuery()

   useIsAuth(user)

   useEffect(() => {
      selectNote(JSON.parse(localStorage.getItem('selectedNote')))
   }, [])

   return (
      <>
         { !user.fetching && user.data?.me
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
               </FullCollectionsDisplayLayout>
               <NoteDisplayLayout>
                  <Flex w="100%" p="1em">
                     <Heading textColor="#05386B">
                        {selectedNote ? selectedNote.title : "Select a Note"}
                     </Heading>
                  </Flex>
                  <Flex w="100%" p="1em">
                     <Text>
                        {selectedNote && selectedNote.body}
                     </Text>
                  </Flex>
               </NoteDisplayLayout>
               {selectedNote &&
                  <Flex direction="column" align="center" h="100%" w="6em" bg="#5CDB95">
                     <Flex direction="column" align="center" pt="1em">
                        <Tooltip label="Add New Note" placement="left">
                           <IconButton
                              aria-label="New Note"
                              icon={<MdAdd />}
                              variant="outline"
                              colorScheme="black"
                              fontSize="3xl"
                              mb="0.75em"
                           />
                        </Tooltip>
                        <Tooltip label="Edit Note" placement="left">
                           <IconButton
                              aria-label="Edit Note"
                              icon={<MdEdit />}
                              variant="outline"
                              colorScheme="black"
                              fontSize="3xl"
                              mb="0.75em"
                           />
                        </Tooltip>
                        <Tooltip label="Delete Note" placement="left">
                           <IconButton
                              aria-label="Delete Note"
                              icon={<MdDelete />}
                              variant="outline"
                              colorScheme="black"
                              fontSize="3xl"
                              mb="0.75em"
                           />
                        </Tooltip>
                     </Flex>
                  </Flex>
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

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(() =>
   <NoteProvider>
      <MyNotes />
   </NoteProvider>
)