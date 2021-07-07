import { Flex, Icon, List, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { UseQueryResponse, UseQueryState } from 'urql'
import { Collection, CollectionsQuery, MeQuery, PublicNotesQuery, UserQuery } from '../../generated/graphql'
import CollectionItem from './CollectionItem'

interface Props {
   user: UseQueryState<MeQuery, object>
   profileUser: UseQueryState<UserQuery, object>
   collections: UseQueryState<PublicNotesQuery, object>
}

const UserCollections: React.FC<Props> = ({ user, profileUser, collections }) => {

   return (
      <Flex align="center" justify="center" w="100%">
         {!collections.fetching && collections.data?.publicNotes &&
            <SimpleGrid columns={{ lg: 2, xl: 2 }} spacing="20px">
               {
                  collections.data?.publicNotes.map((collection: Collection) => (
                     <CollectionItem
                        key={collection.id}
                        collection={collection}
                        profileUser={profileUser}
                        user={user}
                        index={collections.data?.publicNotes.indexOf(collection) as number}
                     />
                  ))
               }
            </SimpleGrid>
         }
      </Flex>
   )
}

export default UserCollections
