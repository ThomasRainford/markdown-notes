import { Alert, AlertDescription, AlertIcon, Button, CloseButton, Flex, Input, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import PasswordResetLayout from '../../components/account/PasswordResetLayout'
import { useForgotPasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {

}

const ForgotPassword = ({ }) => {

   const [email, setEmail] = useState<string>('')
   const [invalidEmail, setInvalidEmail] = useState<boolean>(false)

   const [, forgotPasswordMutation] = useForgotPasswordMutation()

   const handleInput = (event: React.FormEvent<EventTarget>) => setEmail((event.target as HTMLInputElement).value)


   return (
      <PasswordResetLayout header="Forgot Password">
         <Flex direction="column" h="100%" w="20em">
            {invalidEmail &&
               <Alert status="error" mb="1em">
                  <AlertIcon />
                  <AlertDescription>Email not register</AlertDescription>
                  <CloseButton
                     position="absolute"
                     right="8px"
                     top="8px"
                     onClick={() => setInvalidEmail(false)}
                  />
               </Alert>
            }
            <Text mb="0.5em">Enter your Email Address</Text>
            <Input
               name="email"
               placeholder="Email"
               type="text"
               value={email}
               onChange={handleInput}
               autoComplete="off"
               mb="2em"
            />
            <Button
               colorScheme="teal"
               w="30%"
               onClick={async () => {
                  const response = await forgotPasswordMutation({ email })
                  if (response.data?.forgotPassword.errors) {
                     setInvalidEmail(true)
                  }
                  console.log(response)
               }}
            >
               Submit
            </Button>
         </Flex>
      </PasswordResetLayout>
   )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
