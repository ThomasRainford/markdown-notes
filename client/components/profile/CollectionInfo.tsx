import { Flex, Center, Divider, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { MdThumbUp } from 'react-icons/md'
import { Collection, useVoteMutation } from '../../generated/graphql'

interface Props {
   collection: Collection
}

const CollectionInfo: React.FC<Props> = ({ collection }) => {

   const [voteResult, voteMutation] = useVoteMutation()

   return (
      <Flex p="0.5em">
         <Text fontSize="sm" fontStyle="italic">created: {new Date(collection.createdAt).toDateString()}</Text>
         <Center mx="1em">
            <Divider orientation="vertical" />
         </Center>
         <Text fontSize="sm" fontStyle="italic"
            _hover={{ color: "brand.300" }}
            onClick={async () => {
               const response = await voteMutation({ collectionId: collection.id })
            }}
         >
            <Icon as={MdThumbUp} /> {collection.upvotes}
         </Text>
      </Flex>
   )
}

export default CollectionInfo
