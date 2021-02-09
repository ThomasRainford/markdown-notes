import { Flex } from '@chakra-ui/react'
import React from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../../generated/graphql'
import NavBar from '../NavBar'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const ActivityPageLayout = ({ children, user }) => {
   return (
      <div>
         <Flex direction="column" h="100vh">
            <NavBar user={user} />
            <Flex h="100%">
               {children}
            </Flex>
         </Flex>
      </div>
   )
}

export default ActivityPageLayout
