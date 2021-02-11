import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { ssrExchange, dedupExchange, fetchExchange, cacheExchange } from 'urql'
import CollectionAccordianItem from '../../components/my-notes/CollectionAccordianItem'
import FullCollectionsDisplayLayout from '../../components/my-notes/FullCollectionsDisplayLayout'
import MyNotesPageLayout from '../../components/my-notes/MyNotesPageLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { Collection, useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ACTIVITY_FEED_QUERY } from '../../utils/ssr-queries/activityFeed'
import { COLLECTIONS_QUERY } from '../../utils/ssr-queries/collections'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()

   const [collections] = useCollectionsQuery()

   console.log(collections)

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <MyNotesPageLayout user={user}>
               <FullCollectionsDisplayLayout>
                  {!collections.fetching && collections.data?.collections &&
                     <Accordion allowMultiple>
                        {collections.data?.collections.map((collection: Collection) => (
                           <CollectionAccordianItem collection={collection} />
                        ))
                        }
                     </Accordion>
                  }
               </FullCollectionsDisplayLayout>
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