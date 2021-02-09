import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../generated/graphql'
import { MdAccountCircle, MdList } from 'react-icons/md'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const NavBar: React.FC<Props> = ({ user }) => {
   return (
      <Flex
         align="center"
         justify="space-between"
         as="nav"
         bg="#5CDB95"
         textColor="#05386B"
         p="1.25em"
      >
         <Flex align="center">
            <Icon as={MdList} h={10} w={10} mr="0.25em" />
            <Heading size="md">Markdown Notes</Heading>
         </Flex>
         <Flex align="center">
            <Flex border="2px" p="0.4rem" mr="1.5em">
               <Icon as={MdAccountCircle} h={6} w={6} mr="0.5em" />
               {!user.fetching && user.data &&
                  <Text fontWeight="bold">{user.data.me.username}</Text>
               }
            </Flex>
            <Button
               variant="outline"
               size="sm"
            >
               Logout
            </Button>
         </Flex>

      </Flex>
   )
}

export default NavBar
