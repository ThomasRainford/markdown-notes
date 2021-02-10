import { List } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import React from 'react'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import ActivityDisplayLayout from '../../components/activity/ActivityDisplayLayout'
import ActivityItem from '../../components/activity/ActivityItem'
import ActivityPageLayout from '../../components/activity/ActivityPageLayout'
import CollectionItem from '../../components/activity/CollectionItem'
import CollectionsDisplayLayout from '../../components/activity/CollectionsDisplayLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { ActivityFeedResponse, Collection, useActivityFeedQuery, useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ACTIVITY_FEED_QUERY } from '../../utils/ssr-queries/activityFeed'
import { COLLECTIONS_QUERY } from '../../utils/ssr-queries/collections'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const Activity = ({ }) => {

   const [user] = useMeQuery()

   const [collections] = useCollectionsQuery()
   const [activityFeed] = useActivityFeedQuery()

   console.log(activityFeed)

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <ActivityPageLayout user={user}>
               {/* 
                  - Left side: List of collections
                  - - Fixed to the top
                  - - Green colour
                  - Right side: Activity feed
                  - - List of public collections
                  - - White, possibly darker
               */}
               <CollectionsDisplayLayout>
                  {!collections.fetching && collections.data?.collections &&
                     <List spacing={2} p="0.5em">
                        {
                           collections.data?.collections.map((collection: Collection) => (
                              <CollectionItem key={collection.id} collection={collection} />
                           ))
                        }
                     </List>
                  }
               </CollectionsDisplayLayout>
               <ActivityDisplayLayout>
                  {!activityFeed.fetching && activityFeed.data?.activityFeed &&
                     <List spacing={10} w="100%">
                        {
                           activityFeed.data?.activityFeed.map((activity: ActivityFeedResponse) => (
                              <ActivityItem key={activity.collection.id} activity={activity} />
                           ))
                        }
                     </List>
                  }
               </ActivityDisplayLayout>
            </ActivityPageLayout>
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
   await client.query(ACTIVITY_FEED_QUERY).toPromise()

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData(),
      },
   }
}

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(Activity)
