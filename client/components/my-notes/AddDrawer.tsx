import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
   header: string
}

const AddDrawer: React.FC<Props> = ({ header }) => {

   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()
   const inputRef = React.useRef()

   return (
      <Flex justify="center" mt="1.5em">
         <Button
            ref={btnRef}
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="teal"
         >
            New Collection
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
                     <Input ref={inputRef} placeholder="Collection Title" />
                     <Button
                        colorScheme="teal"
                        mt="2em"
                        mr="1em"
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
      </Flex>
   )
}

export default AddDrawer
