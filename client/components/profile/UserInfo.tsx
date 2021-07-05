import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiThumbsUp } from 'react-icons/fi'
import { MdPeopleOutline } from 'react-icons/md'
import { UseQueryState } from 'urql'
import { MeQuery, useFollowMutation, UserQuery } from '../../generated/graphql'
import { followed } from '../../utils/followed'
import { isMyProfile } from '../../utils/isMyProfile'

interface Props {
   profileUser: UseQueryState<UserQuery, object>
   user: UseQueryState<MeQuery, object>
}

const MyUserInfo: React.FC<Pick<Props, "profileUser">> = ({ profileUser }) => {
   return (
      <Flex direction="column" align="center" mr="1.5em">
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

const OthersUserInfo: React.FC<Props> = ({ user, profileUser }) => {

   const [data, follow] = useFollowMutation()

   return (
      <Flex direction="column" align="center" mr="1.5em">
         <Flex direction="column" mb="1em">
            <Text fontSize="5xl" fontWeight="bold">{profileUser.data?.user?.username}</Text>
            <Flex align="center">
               <Icon as={AiOutlineMail} mr="0.5em" />
               <Text>{profileUser.data?.user?.email}</Text>
            </Flex>
         </Flex>
         <Flex w="100%" my="1em">
            <Button colorScheme="blue"
               w="100%"
               isLoading={data.fetching}
               onClick={async () => {
                  await follow({ targetUserId: profileUser.data?.user?.id })
               }}
            >
               {followed(user, profileUser) ? 'Unfollow' : 'Follow'}
            </Button>
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

const UserInfo: React.FC<Props> = ({ user, profileUser }) => {

   return (
      <>
         {isMyProfile(user, profileUser) ?
            <MyUserInfo profileUser={profileUser} />
            :
            <OthersUserInfo user={user} profileUser={profileUser} />
         }
      </>
   )
}

export default UserInfo
