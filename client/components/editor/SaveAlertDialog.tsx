import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
   isOpen: boolean
   onClose: () => void
}

const SaveAlertDialog: React.FC<Props> = ({ isOpen, onClose }) => {

   const cancelRef = React.useRef()

   return (
      <AlertDialog
         isOpen={isOpen}
         leastDestructiveRef={cancelRef}
         onClose={onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Cannot Save
                  </AlertDialogHeader>

               <AlertDialogBody>
                  You cannot save an empty note.
                  </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                     Okay
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}

export default SaveAlertDialog