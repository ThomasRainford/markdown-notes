import { Button, Flex, Heading, Icon, ListItem, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { OperationResult, UseQueryState } from 'urql'
import { ActivityFeedResponse, Exact, MeQuery, SavePublicCollectionMutation, useSavePublicCollectionMutation, useVoteMutation } from '../../generated/graphql'
import CollectionInfo from './CollectionInfo'

interface Props {
   activity: ActivityFeedResponse
   user: UseQueryState<MeQuery, object>
}

const ActivityItem: React.FC<Props> = ({ activity, user }) => {

   const owner = activity.collection.owner
   const _activity = activity.activity
   const collection = activity.collection

   const [voteResult, voteMutation] = useVoteMutation()
   const [saveResult, saveMutation] = useSavePublicCollectionMutation()

   const toast = useToast()

   // Display success or error toast for saving a collection.
   const displayToast = (response: OperationResult<SavePublicCollectionMutation, Exact<{
      targetUserId: string;
      collectionId: string;
   }>>) => {

      if (response.data?.savePublicCollection.error || response.error) {
         toast({
            title: "Save Failed",
            description: "We were unable to save this collection.",
            status: "error",
            duration: 2000,
            isClosable: true,
         })
      } else if (response.data?.savePublicCollection.collection) {
         toast({
            title: "Collection Saved",
            description: "Collection saved successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
         })
      }

   }

   const toDays = (time: string): number => {
      return new Date(time).getDay()
   }

   return (
      <ListItem>
         <Flex m="2em">
            <Icon as={MdAccountCircle} h={6} w={6} mr="1em" />
            <Flex direction="column" w="100%">
               <Flex mb="0.75em">
                  <Text fontWeight="bold" color="brand.400" mr="0.5em">{owner.username}</Text>
                  <Text fontStyle="italic" mr="0.5em">{_activity}d</Text>
                  <Text fontWeight="bold" mr="1.25em">{collection.title}</Text>
                  <Text fontStyle="oblique">{_activity === 'create' ? toDays(collection.createdAt) : toDays(collection.updatedAt)} days ago</Text>
               </Flex>
               <Flex justify="space-between" bg="brand.800" textColor="brand.100" p="0.75em" boxShadow="lg" border="1px" borderColor="brand.200" borderRadius="md">
                  <Flex direction="column" >
                     <Heading size="md" as="h4" mb="0.25em" textColor="brand.100">{collection.title}</Heading>
                     <CollectionInfo collection={collection} />
                  </Flex>
                  <Flex align="center">
                     <Button
                        size="sm"
                        disabled={voteResult.fetching}
                        colorScheme="teal"
                        variant="solid"
                        mr="0.5em"
                        onClick={async () => {
                           const response = await voteMutation({ collectionId: collection.id })
                        }}
                     >
                        {user.data?.me?.upvoted.includes(collection.id) ? 'DownVote' : 'Upvote'}
                     </Button>
                     <Button
                        size="sm"
                        colorScheme="blue"
                        variant="solid"
                        onClick={async () => {
                           const response = await saveMutation({
                              targetUserId: owner.id,
                              collectionId: collection.id
                           })

                           displayToast(response)
                        }}
                     >
                        Save
                     </Button>
                  </Flex>
               </Flex>
            </Flex>
         </Flex>
      </ListItem>
   )
}

export default ActivityItem
