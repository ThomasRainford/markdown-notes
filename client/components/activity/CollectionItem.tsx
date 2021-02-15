import { Flex, ListIcon, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { UseQueryState } from 'urql'
import { Collection, MeQuery, User } from '../../generated/graphql'
import CollectionInfo from './CollectionInfo'

interface Props {
   collection: Collection
   user: UseQueryState<MeQuery, object>
   index: number
}

const CollectionItem: React.FC<Props> = ({ collection, user, index }) => {

   const router = useRouter()

   return (
      <ListItem key={collection.id}>
         <Tooltip hasArrow label="Click to Open" placement="top" bg="#379683">
            <Flex direction="column" bg="#8EE4AF" p="0.5em" border="1px" borderColor="#EDF5E1" borderRadius="md"
               _hover={{ borderColor: "#05386B" }}
               onClick={() => {
                  localStorage.setItem('collectionIndex', index.toString())
                  localStorage.removeItem('selectedNote')
                  router.push(`/my-notes/${user.data?.me?.username}`)
               }}
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
