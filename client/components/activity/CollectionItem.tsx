import { Center, Divider, Flex, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { Collection } from '../../generated/graphql'

interface Props {
   collection: Collection
}

const CollectionItem: React.FC<Props> = ({ collection }) => {
   return (
      <ListItem key={collection.id}>
         <Flex direction="column" bg="#8EE4AF" p="0.5em">
            <Flex align="center">
               <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
               <Text mr="0.5em">{collection.title}</Text>
            </Flex>
            <Flex>
               <Text fontStyle="italic">created: {new Date(collection.createdAt).toDateString()}</Text>
               <Center height="1.5em" mx="0.5em">
                  <Divider orientation="vertical" colorScheme="red" />
               </Center>
               <Text fontStyle="italic">{collection.upvotes} upvotes</Text>
            </Flex>
         </Flex>
      </ListItem >
   )
}

export default CollectionItem
