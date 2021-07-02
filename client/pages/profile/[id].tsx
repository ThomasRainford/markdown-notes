import { Divider, Flex, Icon, List, Skeleton, Stack, Text } from "@chakra-ui/react"
import { initUrqlClient, withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import CollectionItem from "../../components/profile/CollectionItem"
import PageLoadingIndicator from "../../components/PageLoadingIndicator"
import ProfilePageLayout from "../../components/profile/ProfilePageLayout"
import { Collection, useCollectionsQuery, useMeQuery, useUserQuery } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { useIsAuth } from "../../utils/useIsAuth"
import { GetStaticProps, GetStaticPropsContext } from "next"
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql"
import { COLLECTIONS_QUERY } from "../../utils/ssr-queries/collections"
import { USER_QUERY } from "../../utils/ssr-queries/user"
import { BiUserCircle } from "react-icons/bi"
import { AiOutlineMail } from "react-icons/ai"
import { MdPeopleOutline } from "react-icons/md"
import { FiThumbsUp } from "react-icons/fi"


const Profile = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()
   const [collections] = useCollectionsQuery()
   const [profileUser] = useUserQuery({ variables: { username: router.query.id as string } })

   useIsAuth(user)

   return (
      <>
         {!user.fetching && user.data?.me
            ?
            <ProfilePageLayout user={user}>
               {/* profile page layout
               - Username, email, following, followers, stars
               - Public collections
               */}
               {!profileUser.fetching && profileUser.data?.user ?
                  <Flex direction="column" w="100%" align="center">
                     <Flex direction="column" align="center" mb="1.5em">
                        <Flex direction="column" mb="1em">
                           <Text fontSize="5xl" fontWeight="bold">{profileUser.data?.user?.username}</Text>
                           <Flex align="center">
                              <Icon as={AiOutlineMail} mr="0.5em" />
                              <Text>{profileUser.data?.user?.email}</Text>
                           </Flex>
                        </Flex>
                        <Flex align="center">
                           <Icon as={MdPeopleOutline} boxSize={6} color="brand.300" />
                           <Flex m="0.5em">
                              <Text mr="0.4em">followers</Text>
                              <Text fontWeight="bold">{profileUser.data?.user?.followers?.length}</Text>
                           </Flex>
                           <Flex m="0.5em">
                              <Text mr="0.4em">following</Text>
                              <Text fontWeight="bold">{profileUser.data?.user?.following?.length}</Text>
                           </Flex>
                           <Icon as={FiThumbsUp} boxSize={5} color="brand.300" />
                           <Flex m="0.5em">
                              <Text mr="0.4em">upvoted</Text>
                              <Text fontWeight="bold">{profileUser.data?.user?.upvoted?.length}</Text>
                           </Flex>
                        </Flex>
                     </Flex>
                     <Flex>
                        {!collections.fetching && collections.data?.collections &&
                           <List spacing={2} py="0.5em" px="1.5em">
                              {
                                 collections.data?.collections.map((collection: Collection) => (
                                    <CollectionItem
                                       key={collection.id}
                                       collection={collection}
                                       user={profileUser}
                                       index={collections.data?.collections.indexOf(collection) as number}
                                    />
                                 ))
                              }
                           </List>
                        }
                     </Flex>
                  </Flex>
                  :
                  <Flex direction="column" w="100%" align="center">
                     {profileUser.fetching ?
                        <Stack>
                           <Skeleton height="20px" />
                           <Skeleton height="20px" />
                           <Skeleton height="20px" />
                        </Stack>
                        :
                        <Flex direction="column" w="100%" align="center">
                           User note found
                        </Flex>
                     }
                  </Flex>
               }
            </ProfilePageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export async function getServerSideProps(context: GetStaticPropsContext) {
   const ssrCache = ssrExchange({ isClient: false })
   const client = initUrqlClient({
      url: 'https://markdown-notes-app-api.herokuapp.com/graphql',
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
   }, true)

   // This query is used to populate the cache for the query
   // used on this page.
   await client.query(COLLECTIONS_QUERY).toPromise()
   await client.query(USER_QUERY, { username: context.params?.id })

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData(),
      },
   }
}

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(Profile)