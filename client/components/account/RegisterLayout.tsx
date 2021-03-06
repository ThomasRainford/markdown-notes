import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {

}

const RegisterLayout: React.FC<Props> = ({ children }) => {

   const router = useRouter()

   return (
      <Flex h="100vh" w="100vw" justify="center" align="center" bg="brand.100">
         <Flex h="30em" w="100vw" justify="center" align="center">
            <Flex direction="column" bg="brand.200" boxShadow="dark-lg" p="2em" h="100%" w="20.5em" textColor="brand.900">
               <Heading mb="3.4em">Welcome!</Heading>
               <Button
                  variant="outline"
                  _hover={{ textColor: "#05386B", backgroundColor: "white" }}
                  onClick={(() => router.push('/account/login'))}
               >
                  Sign in
               </Button>
            </Flex>
            <Flex direction="column" align="center" bg="brand.900" boxShadow="dark-lg" p="2em" h="100%" w="25.5em">
               <Heading fontSize="2xl" color="#05386B" pb="1em">Create an Account</Heading>
               <Divider orientation="horizontal" colorScheme="blackAlpha" />
               {children}
            </Flex>
         </Flex>
      </Flex>
   )
}

export default RegisterLayout
