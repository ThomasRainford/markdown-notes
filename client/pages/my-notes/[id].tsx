import { Accordion, Flex, Heading } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import CollectionAccordianItem from '../../components/my-notes/CollectionAccordianItem'
import FullCollectionsDisplayLayout from '../../components/my-notes/FullCollectionsDisplayLayout'
import MyNotesPageLayout from '../../components/my-notes/MyNotesPageLayout'
import NoteDisplayLayout from '../../components/my-notes/NoteDisplayLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { Collection, Note, useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { COLLECTIONS_QUERY } from '../../utils/ssr-queries/collections'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()
   const [selectedNote, setSelectedNote] = useState<Note>()

   const [user] = useMeQuery()
   const [collections] = useCollectionsQuery()

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <MyNotesPageLayout user={user}>
               <FullCollectionsDisplayLayout>
                  {!collections.fetching && collections.data?.collections &&
                     <Accordion allowMultiple px="1em" textColor="#05368B">
                        {collections.data?.collections.map((collection: Collection) => (
                           <CollectionAccordianItem key={collection.id} collection={collection} />
                        ))
                        }
                     </Accordion>
                  }
               </FullCollectionsDisplayLayout>
               <NoteDisplayLayout>
                  <Flex w="100%">
                     <Heading>

                     </Heading>
                  </Flex>
               </NoteDisplayLayout>
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