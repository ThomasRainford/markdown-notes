import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../generated/graphql'
import NoteDisplayItem from './NoteDisplayItem'

interface Props {
   list: NotesList
}

const ListAccordionItem: React.FC<Props> = ({ list }) => {
   return (
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>{list.title}</Text>
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            {list.notes.map((note) => (
               <NoteDisplayItem key={note.id} note={note} />
            ))}
         </AccordionPanel>
      </AccordionItem>
   )
}

export default ListAccordionItem
