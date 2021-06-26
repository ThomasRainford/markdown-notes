import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../../generated/graphql'
import NavBar from '../NavBar'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const MyNotesPageLayout: React.FC<Props> = ({ children, user }) => {

   const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

   window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight)
   })

   return (
      <Flex direction="column" h={windowHeight}>
         <NavBar user={user} />
         <Flex h="100%">
            {children}
         </Flex>
      </Flex>
   )
}

export default MyNotesPageLayout
