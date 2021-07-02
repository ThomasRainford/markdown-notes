import { Flex, ListIcon, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { UseQueryState } from 'urql'
import { Collection, MeQuery, User, UserQuery } from '../../generated/graphql'
import CollectionInfo from '../profile/CollectionInfo'

interface Props {
   collection: Collection
   user: UseQueryState<UserQuery, object>
   index: number
}

const CollectionItem: React.FC<Props> = ({ collection, user, index }) => {

   const router = useRouter()

   return (
      <ListItem key={collection.id}>
         <Tooltip hasArrow label="Click to Open" placement="top" bg="brand.200">
            <Flex direction="column" bg="brand.100" p="1em" border="1px" borderColor="brand.200" borderRadius="md"
               _hover={{ borderColor: "brand.900" }}
               onClick={() => {
                  localStorage.setItem('collectionIndex', index.toString())
                  localStorage.removeItem('selectedNote')
                  router.push(`/my-notes/${user.data?.user?.username}`)
               }}
            >
               <Flex align="center">
                  <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
                  <Text fontSize="lg" fontWeight="bold" textColor="brand.300" mb="0.25em" ml="0.5em">{collection.title}</Text>
               </Flex>
               <CollectionInfo collection={collection} />
            </Flex>
         </Tooltip>
      </ListItem >
   )
}

export default CollectionItem
