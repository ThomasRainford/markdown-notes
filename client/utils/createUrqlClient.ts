import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'

export const createUrqlClient = (ssrExchange: any) => {
   return {
      url: 'http://localhost:3000/graphql',
      exchanges: [
         dedupExchange,
         cacheExchange({
            keys: {
               ActivityFeedResponse: () => null
            }
         }),
         ssrExchange,
         fetchExchange
      ],
      fetchOptions: {
         credentials: 'include' as const
      }
   }
}
