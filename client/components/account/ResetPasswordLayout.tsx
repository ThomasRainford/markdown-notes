import { Flex, Heading, Divider, Button } from '@chakra-ui/react'
import router from 'next/dist/next-server/lib/router/router'
import React from 'react'

interface Props {

}

const ResetPasswordLayout = ({ children }) => {
   return (
      <Flex h="100vh" w="100vw" justify="center" align="center" bg="#5CDB95">
         <Flex h="30em" w="100vw" justify="center" align="center">
            <Flex direction="column" align="center" bg="#EDF5E1" boxShadow="dark-lg" p="2em" h="100%" w="25.5em">
               <Heading fontSize="2xl" color="#05386B" pb="1em">Rest Password</Heading>
               <Divider orientation="horizontal" colorScheme="blackAlpha" />
               {children}
            </Flex>
            {/* <Flex direction="column" bg="#05386B" boxShadow="dark-lg" p="2em" h="100%" w="20.5em" textColor="#EDF5E1">
               <Heading mb="3.4em">Hello, again!</Heading>
               <Button
                  variant="outline"
                  _hover={{ textColor: "#05386B", backgroundColor: "white" }}
                  onClick={(() => router.push('/account/register'))}
               >
                  Register
               </Button>
            </Flex> */}
         </Flex>
      </Flex>
   )
}

export default ResetPasswordLayout
