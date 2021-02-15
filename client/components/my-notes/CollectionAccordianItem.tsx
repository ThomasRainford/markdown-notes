import { AddIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ExpandedIndex, Flex, ListIcon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { Collection } from '../../generated/graphql'
import CollectionInfo from '../activity/CollectionInfo'
import AddDrawer from './AddDrawer'
import ListAccordionItem from './ListAccordionItem'

interface Props {
   collection: Collection
}

const CollectionAccordianItem: React.FC<Props> = ({ collection }) => {

   const router = useRouter()

   return (
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  <Flex align="center">
                     <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
                     <Text fontSize="lg" fontWeight="bold" mb="0.25em" ml="0.5em">{collection.title}</Text>
                  </Flex>
                  <CollectionInfo collection={collection} />
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            <Accordion
               defaultIndex={parseInt(localStorage.getItem('listIndex'))}
               onChange={(expandedIndex: ExpandedIndex) => {
                  localStorage.setItem('listIndex', expandedIndex.toString())
               }}
            >
               {collection.lists.map((list) => (
                  <ListAccordionItem key={list.id} list={list} />
               ))
               }
            </Accordion>
            <AddDrawer
               openButtonText="New List"
               header="Create New List"
            />
         </AccordionPanel>
      </AccordionItem>
   )
}

export default CollectionAccordianItem
