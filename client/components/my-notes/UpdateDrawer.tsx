import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Collection, NotesList, useUpdateCollectionMutation, useUpdateNotesListMutation } from '../../generated/graphql'

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
   const [title, setTitle] = useState<string>(isCollection() ? collection.title : list.title)
   const [visibility, setVisibility] = useState<string>(collection && collection.visibility)

   const [, updateCollectionMutation] = useUpdateCollectionMutation()
   const [, updateNotesListMutation] = useUpdateNotesListMutation()

   const handleInput = (event: React.FormEvent<EventTarget>) => setTitle((event.target as HTMLInputElement).value)

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
                     defaultValue={title}
                     onChange={handleInput}
                  />
                  {isCollection() &&
                     <RadioGroup defaultValue={visibility} onChange={(next) => { setVisibility(next.toString()) }}>
                        <Stack direction="row" mt="1em">
                           <Radio value="public">Public</Radio>
                           <Radio value="private">Private</Radio>
                        </Stack>
                     </RadioGroup>
                  }
                  <Button
                     colorScheme="teal"
                     mt="2em"
                     mr="1em"
                     onClick={async () => {
                        if (isCollection()) {
                           await updateCollectionMutation({
                              id: collection.id,
                              collectionInput: {
                                 title,
                                 visibility
                              }
                           })
                        } else {
                           await updateNotesListMutation({
                              listLocation: {
                                 collectionId: list.collection.id,
                                 listId: list.id
                              },
                              notesListInput: {
                                 title
                              }
                           })
                        }
                        onClose()
                     }}
                  >Update</Button>
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
