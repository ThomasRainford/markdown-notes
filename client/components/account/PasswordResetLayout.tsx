import { Flex, Heading, Divider, Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
   header: string
}

const PasswordResetLayout: React.FC<Props> = ({ children, header }) => {
   return (
      <Flex h="100vh" w="100vw" justify="center" align="center" bg="brand.100">
         <Flex h="20em" w="100vw" justify="center" align="center">
            <Flex direction="column" align="center" bg="#EDF5E1" boxShadow="dark-lg" p="2em" h="100%" w="25.5em">
               <Heading fontSize="2xl" color="#05386B" pb="1em">{header}</Heading>
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

export default PasswordResetLayout
