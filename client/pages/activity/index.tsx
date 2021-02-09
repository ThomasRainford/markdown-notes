import { Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import ActivityLayout from '../../components/activity/ActivityLayout'
import CollectionsDisplayLayout from '../../components/activity/CollectionsDisplayLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const Activity = ({ }) => {

   const [user] = useMeQuery()

   const [collections] = useCollectionsQuery()

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <ActivityLayout user={user}>
               {/* 
                  - Left side: List of collections
                  - - Fixed to the top
                  - - Green colour
                  - Right side: Activity feed
                  - - List of public collections
                  - - White, possibly darker
               */}
               <CollectionsDisplayLayout>
                  collections here
               </CollectionsDisplayLayout>
            </ActivityLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Activity)
