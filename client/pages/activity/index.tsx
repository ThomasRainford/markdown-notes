import { Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import ActivityLayout from '../../components/activity/ActivityLayout'
import NavBar from '../../components/NavBar'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const Activity = ({ }) => {

   const [user] = useMeQuery()

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <ActivityLayout user={user}>
               Content
            </ActivityLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Activity)
