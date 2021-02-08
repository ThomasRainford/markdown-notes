import { Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
   heading: string
}

const RegisterLayout = ({ children, heading }) => {
   return (
      <Flex h="100vh" w="100vw" justify="center" align="center" bg="#5CDB95">
         <Flex h="30em" w="100vw" justify="center" align="center">
            <Flex direction="column" bg="#05386B" boxShadow="dark-lg" p="2em" h="100%" w="20.5em" textColor="#EDF5E1">
               <Heading>Welcome!</Heading>
            </Flex>
            <Flex direction="column" bg="#EDF5E1" boxShadow="dark-lg" p="2em" h="100%" w="25.5em">
               <Text fontSize="2xl" pb="1em">{heading}</Text>
               <Divider orientation="horizontal" colorScheme="blackAlpha" />
               {children}
            </Flex>
         </Flex>
      </Flex >
   )
}

export default RegisterLayout
