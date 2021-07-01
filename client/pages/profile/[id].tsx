import { Flex } from "@chakra-ui/react"
import { initUrqlClient, withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql"
import PageLoadingIndicator from "../../components/PageLoadingIndicator"
import { useMeQuery } from "../../generated/graphql"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { COLLECTIONS_QUERY } from "../../utils/ssr-queries/collections"
import { useIsAuth } from "../../utils/useIsAuth"


const Profile = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()

   useIsAuth(user)

   return (
      <>
         {!user.fetching && user.data?.me
            ?
            <Flex></Flex>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export async function getServerSideProps() {
   const ssrCache = ssrExchange({ isClient: false })
   const client = initUrqlClient({
      url: 'https://markdown-notes-app-api.herokuapp.com/graphql',
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
   }, true)

   // This query is used to populate the cache for the query
   // used on this page.
   await client.query(COLLECTIONS_QUERY).toPromise()

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData(),
      },
   }
}

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(Profile)