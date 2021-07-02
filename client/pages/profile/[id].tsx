import { Divider, Flex, Icon, List, Skeleton, Stack, Text } from "@chakra-ui/react"
import { initUrqlClient, withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import CollectionItem from "../../components/profile/CollectionItem"
import PageLoadingIndicator from "../../components/PageLoadingIndicator"
import ProfilePageLayout from "../../components/profile/ProfilePageLayout"
import { Collection, useCollectionsQuery, useMeQuery, usePublicNotesQuery, useUserQuery } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { useIsAuth } from "../../utils/useIsAuth"
import { GetStaticPropsContext } from "next"
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql"
import { COLLECTIONS_QUERY } from "../../utils/ssr-queries/collections"
import { USER_QUERY } from "../../utils/ssr-queries/user"
import UserCollections from "../../components/profile/UserCollections"
import UserInfo from "../../components/profile/UserInfo"
import { PUBLICNOTES_QUERY } from "../../utils/ssr-queries/publicNotes"


const Profile = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()
   const [collections] = usePublicNotesQuery({ variables: { username: router.query.id as string } })
   const [profileUser] = useUserQuery({ variables: { username: router.query.id as string } })

   useIsAuth(user)

   return (
      <>
         {!user.fetching && user.data?.me
            ?
            <ProfilePageLayout user={user}>
               {!profileUser.fetching && profileUser.data?.user ?
                  <Flex direction="column" w="100%" align="center">
                     <Flex direction="column">
                        <UserInfo user={user} profileUser={profileUser} />
                        <UserCollections user={user} profileUser={profileUser} collections={collections} />
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
   await client.query(PUBLICNOTES_QUERY, { username: context.params?.id }).toPromise()
   await client.query(USER_QUERY, { username: context.params?.id }).toPromise()

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData(),
      },
   }
}

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(Profile)