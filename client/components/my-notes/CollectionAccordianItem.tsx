import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Accordion } from '@chakra-ui/react'
import React from 'react'
import { Collection } from '../../generated/graphql'

interface Props {
   collection: Collection
}

const CollectionAccordianItem: React.FC<Props> = ({ children, collection }) => {

   console.log('collection: ', collection)

   return (
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
            <Accordion>

               {collection.lists.map((list) => (
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <Box flex="1" textAlign="left">
                              {list.title}
                           </Box>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                  </AccordionItem>
               ))
               }
            </Accordion>
         </AccordionPanel>
      </AccordionItem>
   )
}

export default CollectionAccordianItem
