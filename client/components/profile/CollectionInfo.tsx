import { Flex, Center, Divider, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { MdThumbUp } from 'react-icons/md'
import { Collection } from '../../generated/graphql'

interface Props {
   collection: Collection
}

const CollectionInfo: React.FC<Props> = ({ collection }) => {
   return (
      <Flex p="0.5em">
         <Text fontSize="sm" fontStyle="italic">created: {new Date(collection.createdAt).toDateString()}</Text>
         <Center mx="0.75em">
            <Divider orientation="vertical" />
         </Center>
         <Text fontSize="sm" fontStyle="italic"><Icon as={MdThumbUp} /> {collection.upvotes}</Text>
      </Flex>
   )
}

export default CollectionInfo
