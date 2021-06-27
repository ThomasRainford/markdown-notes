import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ExpandedIndex, Flex, ListIcon, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { Collection } from '../../generated/graphql'
import CollectionInfo from '../activity/CollectionInfo'
import AddDrawer from './AddDrawer'
import ListAccordionItem from './ListAccordionItem'
import UpdateDrawer from './UpdateDrawer'

interface Props {
   collection: Collection
}

const CollectionAccordianItem: React.FC<Props> = ({ collection }) => {

   const router = useRouter()

   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()

   return (
      <AccordionItem>
         <h2>
            <AccordionButton
               ref={btnRef}
               onDoubleClick={onOpen}
            >
               <Box flex="1" textAlign="left">
                  <Flex align="center">
                     <ListIcon as={collection.visibility === 'public' ? MdLockOpen : MdLock} />
                     <Text fontSize="lg" fontWeight="bold" textColor="brand.300" mb="0.25em" ml="0.5em">{collection.title}</Text>
                  </Flex>
                  <CollectionInfo collection={collection} />
               </Box>
               <AccordionIcon />
            </AccordionButton>
            <UpdateDrawer collection={collection} header="Update Collection" isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
         </h2>
         <AccordionPanel pb={4}>
            <Accordion
               allowToggle
               defaultIndex={parseInt(localStorage.getItem('listIndex'))}
               onChange={(expandedIndex: ExpandedIndex) => {
                  localStorage.setItem('listIndex', expandedIndex.toString())
               }}
            >
               {collection.lists.map((list) => (
                  <ListAccordionItem key={list.id} collection={collection} list={list} />
               ))
               }
            </Accordion>
            <AddDrawer
               collection={collection}
               openButtonText="New List"
               header="Create New List"
            />
         </AccordionPanel>
      </AccordionItem>
   )
}

export default CollectionAccordianItem
