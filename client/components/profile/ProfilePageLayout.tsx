import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../../generated/graphql'
import NavBar from '../NavBar'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const ProfilePageLayout: React.FC<Props> = ({ children, user }) => {

   return (
      <Flex direction="column" w="100%" h="100%" minHeight="100vh">
         <NavBar user={user} />
         <Flex minHeight="100vh" w="100%" background="brand.100" textColor="brand.900">
            {children}
         </Flex>
      </Flex>
   )
}

export default ProfilePageLayout
