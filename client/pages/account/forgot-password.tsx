import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import PasswordResetLayout from '../../components/account/PasswordResetLayout'
import { useForgotPasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {

}

const ForgotPassword = ({ }) => {

   const [email, setEmail] = useState<string>()

   const [, forgotPasswordMutation] = useForgotPasswordMutation()

   const handleInput = (event: React.FormEvent<EventTarget>) => setEmail((event.target as HTMLInputElement).value)


   return (
      <PasswordResetLayout header="Forgot Password">
         <Flex direction="column" h="100%" w="20em">
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
               }}
            >
               Submit
            </Button>
         </Flex>
      </PasswordResetLayout>
   )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
