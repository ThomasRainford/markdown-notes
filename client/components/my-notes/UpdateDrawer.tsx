import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react'
import React from 'react'
import { Collection, NotesList } from '../../generated/graphql'

interface Props {
   collection?: Collection
   list?: NotesList
   header: string
   isOpen: boolean
   onClose: () => void
   btnRef: React.MutableRefObject<undefined>
}

const UpdateDrawer: React.FC<Props> = ({ collection, list, header, isOpen, onClose, btnRef }) => {

   const inputRef = React.useRef()

   const isCollection = (): boolean => header.toLowerCase().includes('collection')

   return (
      <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         finalFocusRef={btnRef}
         initialFocusRef={inputRef}
      >
         <DrawerOverlay>
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>{header}</DrawerHeader>

               <DrawerBody>
                  <Input
                     ref={inputRef}
                     defaultValue={isCollection() ? collection.title : list.title}
                  />
                  <Button
                     colorScheme="teal"
                     mt="2em"
                     mr="1em"
                     onClick={async () => {

                     }}
                  >Create</Button>
                  <Button
                     mt="2em"
                     onClick={onClose}
                  >
                     Cancel
                  </Button>
               </DrawerBody>

               <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button color="blue">Save</Button>
               </DrawerFooter>
            </DrawerContent>
         </DrawerOverlay>
      </Drawer>
   )
}

export default UpdateDrawer
