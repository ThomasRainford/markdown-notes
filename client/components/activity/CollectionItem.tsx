import { Center, Divider, Flex, Icon, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdLock, MdLockOpen, MdThumbUp } from 'react-icons/md'
import { Collection } from '../../generated/graphql'
import CollectionInfo from './CollectionInfo'

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
            <CollectionInfo collection={collection} />
         </Flex>
      </ListItem >
   )
}

export default CollectionItem
