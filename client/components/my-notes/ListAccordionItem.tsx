import { AddIcon } from '@chakra-ui/icons'
import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text, Button, Flex } from '@chakra-ui/react'
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
            {
               list.notes.length === 0 &&
               <Flex justify="center" mt="0.5em">
                  <Button
                     leftIcon={<AddIcon />}
                     variant="outline"
                     size="sm"
                  >
                     Add Note
                     </Button>
               </Flex>
            }
         </AccordionPanel >
      </AccordionItem >
   )
}

export default ListAccordionItem
