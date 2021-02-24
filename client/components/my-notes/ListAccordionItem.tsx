import { AddIcon } from '@chakra-ui/icons'
import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { NoteContext } from '../../context/NoteContext'
import { Collection, NotesList } from '../../generated/graphql'
import NoteDisplayItem from './NoteDisplayItem'
import UpdateDrawer from './UpdateDrawer'

interface Props {
   collection: Collection
   list: NotesList
}

const ListAccordionItem: React.FC<Props> = ({ collection, list }) => {

   const router = useRouter()

   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()

   const { selectNoteLocation, getSelectedNoteLocation } = useContext(NoteContext)
   const selectedNoteLocation = getSelectedNoteLocation()

   const handleAddNote = (): void => {
      selectNoteLocation({
         noteLocation: {
            collection: collection,
            list: list,
            note: null
         }
      })
      localStorage.setItem('noteLocation', JSON.stringify({ collection, list }))
      router.push(router.asPath + '/editor')
   }

   return (
      <AccordionItem>
         <h2>
            <AccordionButton
               onDoubleClick={onOpen}
            >
               <Box flex="1" textAlign="left" fontWeight="bold">
                  {/** TODO: Add list icon here. */}
                  <Text>{list.title}</Text>
               </Box>
               <AccordionIcon />
            </AccordionButton>
            <UpdateDrawer list={list} header="Update List" isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
         </h2>
         <AccordionPanel pb={4}>
            {list.notes.map((note) => (
               <NoteDisplayItem key={note.id} noteLocation={{ noteLocation: { collection, list, note } }} />
            ))}
            <Flex justify="center" mt="0.5em">
               <Button
                  leftIcon={<AddIcon />}
                  colorScheme="brand"
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
