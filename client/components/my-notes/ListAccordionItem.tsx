import { AddIcon } from '@chakra-ui/icons'
import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Collection, NotesList } from '../../generated/graphql'
import NoteDisplayItem from './NoteDisplayItem'

interface Props {
   collection: Collection
   list: NotesList
}

const ListAccordionItem: React.FC<Props> = ({ collection, list }) => {

   const router = useRouter()

   const handleAddNote = (): void => {
      localStorage.setItem('noteLocation', JSON.stringify({ collection, list }))
      router.push(router.asPath + '/editor')
   }

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
            <Flex justify="center" mt="0.5em">
               <Button
                  leftIcon={<AddIcon />}
                  variant="outline"
                  size="sm"
                  onClick={handleAddNote}
               >
                  Add Note
                     </Button>
            </Flex>
         </AccordionPanel >
      </AccordionItem >
   )
}

export default ListAccordionItem
