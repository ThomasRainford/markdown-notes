import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Accordion, Text } from '@chakra-ui/react'
import React from 'react'
import { Collection } from '../../generated/graphql'
import CollectionInfo from '../activity/CollectionInfo'
import ListAccordionItem from './ListAccordionItem'

interface Props {
   collection: Collection
}

const CollectionAccordianItem: React.FC<Props> = ({ children, collection }) => {

   return (
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  <Text fontSize="lg" fontWeight="bold" mb="0.25em">{collection.title}</Text>
                  <CollectionInfo collection={collection} />
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            <Accordion allowMultiple>
               {collection.lists.map((list) => (
                  <ListAccordionItem key={list.id} list={list} />
               ))
               }
            </Accordion>
         </AccordionPanel>
      </AccordionItem>
   )
}

export default CollectionAccordianItem
