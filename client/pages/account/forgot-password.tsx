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
   const [alert, setAlert] = useState<JSX.Element>(null)

   const [, forgotPasswordMutation] = useForgotPasswordMutation()

   const handleInput = (event: React.FormEvent<EventTarget>) => setEmail((event.target as HTMLInputElement).value)

   const alertElement = (
      status: "info" | "warning" | "success" | "error",
      description: string
   ): JSX.Element => (
      <Alert status={status} mb="1em">
         <AlertIcon />
         <AlertDescription>{description}</AlertDescription>
         <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => {
               setAlert(null)
            }}
         />
      </Alert>
   )


   return (
      <PasswordResetLayout header="Forgot Password">
         <Flex direction="column" h="100%" w="20em">
            {alert}
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
                     setAlert(alertElement("error", "Email not register"))
                  }

                  if (response.data?.forgotPassword.user) {
                     setAlert(alertElement("success", "Check your inbox for a link"))
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
