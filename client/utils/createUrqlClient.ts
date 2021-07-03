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

const invalidateUser = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'user')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'user', fi.arguments || null)
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
   console.log(process.env.NEXT_PUBLIC_PRODAPI)
   return {
      url: process.env.NEXT_PUBLIC_PRODAPI,
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  vote: (_result, _args, cache, _info) => {
                     invalidateActivityFeed(cache)
                     invalidateMe(cache)
                  },
                  follow: (_result, _args, cache, _info) => {
                     invalidateUser(cache)
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
                  updateCollection: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  updateNotesList: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  deleteNote: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  deleteCollection: (_result, _args, cache, _info) => {
                     invalidateCollections(cache)
                  },
                  deleteNotesList: (_result, _args, cache, _info) => {
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
