import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { ssrExchange, dedupExchange, fetchExchange, cacheExchange } from 'urql'
import FullCollectionsDisplayLayout from '../../components/my-notes/FullCollectionsDisplayLayout'
import MyNotesPageLayout from '../../components/my-notes/MyNotesPageLayout'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import { useCollectionsQuery, useMeQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ACTIVITY_FEED_QUERY } from '../../utils/ssr-queries/activityFeed'
import { COLLECTIONS_QUERY } from '../../utils/ssr-queries/collections'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()

   const [collections] = useCollectionsQuery()

   console.log(collections)

   useIsAuth(user)

   return (
      <>
         { !user.fetching && user.data?.me
            ?
            <MyNotesPageLayout user={user}>
               <FullCollectionsDisplayLayout>
                  {!collections.fetching && collections.data?.collections &&
                     <Accordion allowMultiple>
                        {collections.data?.collections.map((collection) => (
                           <AccordionItem>
                              <h2>
                                 <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                       {collection.title}
                                    </Box>
                                    <AccordionIcon />
                                 </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                 lists here
                              </AccordionPanel>
                           </AccordionItem>
                        ))
                        }
                     </Accordion>
                  }
               </FullCollectionsDisplayLayout>
               {/*<Flex>
               - Use one side menu.
               - Collection will be Chakra Accordians.
               - Inside the collections are the lists which will also be Accordians (hopefully).
               - Inside the list Accordians are the notes.
               - Need to hightlight currently selected collection and list Accordian.
               - Below is a successful test of implementing Accordian components inside an Accordian component.
               
                  <Accordion allowMultiple>
                     <AccordionItem>
                        <h2>
                           <AccordionButton>
                              <Box flex="1" textAlign="left">
                                 Section 1 title
                              </Box>
                              <AccordionIcon />
                           </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                           <Accordion allowMultiple>
                              <AccordionItem>
                                 <h2>
                                    <AccordionButton>
                                       <Box flex="1" textAlign="left">
                                          Section 1 title
                                       </Box>
                                       <AccordionIcon />
                                    </AccordionButton>
                                 </h2>
                                 <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                 </AccordionPanel>
                              </AccordionItem>

                              <AccordionItem>
                                 <h2>
                                    <AccordionButton>
                                       <Box flex="1" textAlign="left">
                                          Section 2 title
                              </Box>
                                       <AccordionIcon />
                                    </AccordionButton>
                                 </h2>
                                 <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                 </AccordionPanel>
                              </AccordionItem>
                           </Accordion>
                        </AccordionPanel>
                     </AccordionItem>

                     <AccordionItem>
                        <h2>
                           <AccordionButton>
                              <Box flex="1" textAlign="left">
                                 Section 2 title
                              </Box>
                              <AccordionIcon />
                           </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                           tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                           commodo consequat.
                        </AccordionPanel>
                     </AccordionItem>
                  </Accordion>
               </Flex> */}
            </MyNotesPageLayout>
            :
            <PageLoadingIndicator />
         }
      </>
   )
}

export async function getServerSideProps() {
   const ssrCache = ssrExchange({ isClient: false })
   const client = initUrqlClient({
      url: 'http://localhost:3000/graphql',
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

export default withUrqlClient(createUrqlClient, { neverSuspend: true, ssr: false })(MyNotes)