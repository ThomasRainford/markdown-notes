import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Flex, Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Collection, useCreateCollectionMutation, useCreateNotesListMutation } from '../../generated/graphql'

interface Props {
   collection: Collection
   openButtonText: string
   header: string
}

const AddDrawer: React.FC<Props> = ({ collection, openButtonText, header }) => {

   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()
   const inputRef = React.useRef()

   const toast = useToast()

   const [title, setTitle] = useState<string>('')
   const [visibility, setVisibility] = useState<string>('private')

   const [collectionResult, collectionMutation] = useCreateCollectionMutation()
   const [listResult, listMutation] = useCreateNotesListMutation()

   const handleInput = (event: React.FormEvent<EventTarget>) => setTitle((event.target as HTMLInputElement).value)
   const isCollection = (): boolean => header.includes('Collection')

   return (
      <Flex justify="center" mt="1.5em">
         <Button
            ref={btnRef}
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="teal"
         >
            {openButtonText}
         </Button>
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
                        placeholder="Title"
                        value={title}
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
                           console.log(isCollection())
                           if (isCollection()) {
                              const response = await collectionMutation({ title, visibility })
                              console.log(response)
                           } else {
                              const response = await listMutation({ collectionId: collection.id, title })
                              console.log(response)
                           }
                           onClose()
                        }}
                     >Create</Button>
                     <Button
                        mt="2em"
                        onClick={onClose}
                     >Cancel</Button>
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
      </Flex >
   )
}

export default AddDrawer
