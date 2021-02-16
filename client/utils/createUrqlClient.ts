import { Cache, cacheExchange } from '@urql/exchange-graphcache'
import { SSRExchange } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'

const invalidateActivityFeed = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'activityFeed')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'activityFeed', fi.arguments || null)
   })
}

const invalidateMe = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'me')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'me', fi.arguments || null)
   })
}

const invalidateCollections = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'collections')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'collections', fi.arguments || null)
   })
}

export const createUrqlClient = (ssrExchange: SSRExchange) => {
   return {
      url: 'http://localhost:3000/graphql',
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  vote: (_result, _args, cache, _info) => {
                     invalidateActivityFeed(cache)
                     invalidateMe(cache)
                  },
                  savePublicCollection: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  createCollection: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  createNotesList: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  addNote: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  updateNote: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
               },
            },
            keys: {
               ActivityFeedResponse: () => null,
               NoteResponse: () => null,
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
