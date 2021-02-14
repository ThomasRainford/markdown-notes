import { Center, Divider, Flex, Icon, ListIcon, ListItem, Text, Tooltip } from '@chakra-ui/react'
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
         <Tooltip hasArrow label="Open Collection" bg="#379683">
            <Flex direction="column" bg="#8EE4AF" p="0.5em" border="1px" borderColor="#EDF5E1" borderRadius="md"
               _hover={{ borderColor: "#05386B" }}
            >
               <Flex align="center">
                  <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
                  <Text fontSize="lg" fontWeight="bold" mb="0.25em" ml="0.5em">{collection.title}</Text>
               </Flex>
               <CollectionInfo collection={collection} />
            </Flex>
         </Tooltip>
      </ListItem>
   )
}

export default CollectionItem
