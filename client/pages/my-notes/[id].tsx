import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useMeQuery } from '../../generated/graphql'
import { useIsAuth } from '../../utils/useIsAuth'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()

   const [user] = useMeQuery()

   useIsAuth(user)

   console.log(router.query.id)

   return (
      <Flex>
         {/*
            - Use one side menu.
            - Collection will be Chakra Accordians.
            - Inside the collections are the lists which will also be Accordians (hopefully).
            - Inside the list Accordians are the notes.
            - Need to hightlight currently selected collection and list Accordian.
            - Below is a successful test of implementing Accordian components inside an Accordian component.
         */}
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
      </Flex>
   )
}

export default MyNotes