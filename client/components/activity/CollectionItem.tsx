import { Flex, Heading, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdLockOpen, MdLock } from 'react-icons/md'
import { Collection } from '../../generated/graphql'

interface Props {
   collection: Collection
}

const CollectionItem: React.FC<Props> = ({ collection }) => {
   return (
      <ListItem key={collection.id}>
         <Flex direction="column" bg="#8EE4AF" p="0.75em">
            <Flex align="center">
               <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
               <Heading size="md" mr="0.5em">{collection.title}</Heading>
            </Flex>
            <Flex>
               <Text fontStyle="italic" mr="0.5em">{collection.upvotes} upvotes</Text>
               <Text>- created {new Date(collection.createdAt).getDay()} days ago</Text>
            </Flex>
         </Flex>
      </ListItem>
   )
}

export default CollectionItem
