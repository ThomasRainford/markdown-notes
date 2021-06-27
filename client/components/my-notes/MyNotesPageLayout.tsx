import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../../generated/graphql'
import NavBar from '../NavBar'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const MyNotesPageLayout: React.FC<Props> = ({ children, user }) => {

   return (
      <Flex direction="column" h="100%" minHeight="100vh">
         <NavBar user={user} />
         <Flex minHeight="100vh">
            {children}
         </Flex>
      </Flex>
   )
}

export default MyNotesPageLayout
