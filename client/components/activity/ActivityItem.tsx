import { Flex, Heading, Icon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdAccountCircle, MdThumbUp } from 'react-icons/md'
import { ActivityFeedResponse } from '../../generated/graphql'
import CollectionInfo from './CollectionInfo'

interface Props {
   activity: ActivityFeedResponse
}

const ActivityItem: React.FC<Props> = ({ activity }) => {

   const owner = activity.collection.owner
   const _activity = activity.activity
   const collection = activity.collection

   const toDays = (time: string): number => {
      return new Date(collection.createdAt).getDay()
   }

   return (
      <ListItem>
         <Flex m="2em">
            <Icon as={MdAccountCircle} h={6} w={6} mr="1em" />
            <Flex direction="column" w="100%">
               <Flex mb="0.75em">
                  <Text fontWeight="bold" mr="0.5em">{owner.username}</Text>
                  <Text fontStyle="italic" mr="0.5em">{_activity}d</Text>
                  <Text fontWeight="bold" mr="1.25em">{collection.title}</Text>
                  <Text fontStyle="oblique">{_activity === 'create' ? toDays(collection.createdAt) : toDays(collection.updatedAt)} days ago</Text>
               </Flex>
               <Flex direction="column" bg="#5CDB95" p="0.75em" boxShadow="lg" border="1px" borderColor="#379683" borderRadius="md">
                  <Heading size="md" mb="0.25em">{collection.title}</Heading>
                  <CollectionInfo collection={collection} />
               </Flex>
            </Flex>
         </Flex>
      </ListItem >
   )
}

export default ActivityItem
