import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Flex, Heading, Icon, Link, localStorageManager, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseQueryState } from 'urql'
import { MeQuery, useLogoutMutation } from '../generated/graphql'
import { MdAccountCircle, MdList } from 'react-icons/md'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const NavBar: React.FC<Props> = ({ user }) => {

   const router = useRouter()
   const [result, logoutMutation] = useLogoutMutation()

   const [isOpen, setIsOpen] = useState<boolean>(false)
   const cancelRef = useRef()

   const handleLogout = async () => {
      console.log('logout!')
      const response = await logoutMutation()
      console.log(response)

      localStorage.removeItem('listIndex')
      localStorage.removeItem('collectionIndex')
      localStorage.removeItem('selectedNote')
      localStorage.removeItem('noteLocation')
      localStorage.removeItem('note')
      router.replace('/')
   }

   return (
      <>
         <Flex
            align="center"
            justify="space-between"
            as="nav"
            bg="brand.100"
            textColor="brand.900"
            p="1.25em"
         >
            <Flex align="center" justify="space-between">
               <Flex mr="2em">
                  <Icon as={MdList} h={10} w={10} mr="0.25em" />
                  <Heading size="md" my="auto">Markdown Notes</Heading>
               </Flex>
               <Flex>
                  <NextLink href="/activity">
                     <Link mr="1em">Activity</Link>
                  </NextLink>
                  <NextLink href={`/my-notes/${user.data?.me?.username}`}>
                     <Link>My Notes</Link>
                  </NextLink>
               </Flex>
               <Flex>
               </Flex>
            </Flex>
            <Flex align="center">
               <Flex border="2px" borderRadius="md" p="0.4rem" mr="0.5em">
                  <Icon as={MdAccountCircle} h={6} w={6} mr="0.5em" />
                  {!user.fetching && user.data &&
                     <Text fontWeight="bold">{user.data.me.username}</Text>
                  }
               </Flex>
               <Button
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => setIsOpen(true)}
               >
                  Logout
               </Button>
            </Flex>
         </Flex>
         {/* Alert dialog for logging out */}
         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsOpen(false)}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     log Out
                  </AlertDialogHeader>
                  <AlertDialogBody>
                     Are you sure you want to log out?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                        Cancel
                     </Button>
                     <Button colorScheme="red" ml={3}
                        onClick={handleLogout}>
                        Log Out
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   )
}

export default NavBar
