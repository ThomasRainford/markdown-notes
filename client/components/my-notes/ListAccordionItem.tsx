import { AccordionItem, AccordionButton, Box, list, AccordionIcon } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../generated/graphql'

interface Props {
   list: NotesList
}

const ListAccordionItem: React.FC<Props> = ({ list }) => {
   return (
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
   )
}

export default ListAccordionItem
