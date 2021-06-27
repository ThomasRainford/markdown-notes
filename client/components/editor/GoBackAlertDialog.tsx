import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { UseQueryState } from 'urql'
import { MeQuery, User } from '../../generated/graphql'

interface Props {
   isOpen: boolean
   onClose: () => void
   deleteNote: () => Promise<void>
   user: UseQueryState<MeQuery, object>
}

const GoBackAlertDialog: React.FC<Props> = ({ isOpen, onClose, deleteNote, user }) => {

   const router = useRouter()
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
                  Unsaved work will be deleted
               </AlertDialogHeader>

               <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button
                     ml={3}
                     colorScheme="red"
                     onClick={async () => {
                        //await deleteNote()
                        onClose()
                        localStorage.removeItem('noteId')
                        localStorage.removeItem('note')
                        router.replace(`/my-notes/${user.data?.me?.username}`)
                     }}
                  >
                     Go Back
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}

export default GoBackAlertDialog