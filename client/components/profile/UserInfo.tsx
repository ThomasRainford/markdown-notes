import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiThumbsUp } from 'react-icons/fi'
import { MdPeopleOutline } from 'react-icons/md'
import { UseQueryState } from 'urql'
import { UserQuery } from '../../generated/graphql'

interface Props {
   profileUser: UseQueryState<UserQuery, object>
}

const UserInfo: React.FC<Props> = ({ profileUser }) => {

   return (
      <Flex direction="column" align="center" mb="1.5em">
         <Flex direction="column" mb="1em">
            <Text fontSize="5xl" fontWeight="bold">{profileUser.data?.user?.username}</Text>
            <Flex align="center">
               <Icon as={AiOutlineMail} mr="0.5em" />
               <Text>{profileUser.data?.user?.email}</Text>
            </Flex>
         </Flex>
         <Flex align="center">
            <Icon as={MdPeopleOutline} boxSize={6} color="brand.300" />
            <Flex m="0.5em">
               <Text mr="0.4em">followers</Text>
               <Text fontWeight="bold">{profileUser.data?.user?.followers?.length}</Text>
            </Flex>
            <Flex m="0.5em">
               <Text mr="0.4em">following</Text>
               <Text fontWeight="bold">{profileUser.data?.user?.following?.length}</Text>
            </Flex>
            <Icon as={FiThumbsUp} boxSize={5} color="brand.300" />
            <Flex m="0.5em">
               <Text mr="0.4em">upvoted</Text>
               <Text fontWeight="bold">{profileUser.data?.user?.upvoted?.length}</Text>
            </Flex>
         </Flex>
      </Flex>
   )
}

export default UserInfo
