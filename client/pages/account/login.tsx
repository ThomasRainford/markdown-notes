import { Flex, FormControl, Input, Button, Text, FormErrorMessage, Alert, AlertDescription, AlertIcon, CloseButton } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import LoginLayout from '../../components/account/LoginLayout'
import { LoginMutationVariables, useLoginMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {

}

const Login = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()
   const [invalidLogin, setInvalidLogin] = useState<JSX.Element>(null)

   const [result, loginMutation] = useLoginMutation()

   const onSubmit = async ({ usernameOrEmail, password }: LoginMutationVariables) => {

      const response = await loginMutation({ usernameOrEmail, password })
      if (response.data?.login.user) {
         console.log('Success!')
         router.push('/activity')
      }

      if (response.data?.login.errors) {
         console.log('Invalid login')
         setInvalidLogin(
            <Alert status="error" mb="1em">
               <AlertIcon />
               <AlertDescription>Incorrect Login</AlertDescription>
               <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setInvalidLogin(null)}
               />
            </Alert>
         )
      }

   }

   return (
      <LoginLayout>
         <Flex direction="column" h="100%" w="20em">
            {invalidLogin}
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl pb="1em">
                  <Input
                     name="usernameOrEmail"
                     placeholder="Username or Email"
                     autoComplete="off"
                     ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                     {errors.usernameOrEmail && errors.usernameOrEmail.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl pb="1em">
                  <Input
                     name="password"
                     placeholder="Password"
                     type="password"
                     ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                     {errors.password && errors.password.message}
                  </FormErrorMessage>
               </FormControl>

               <Flex direction="column">
                  <Button
                     variant="solid"
                     colorScheme="teal"
                     mb="2em"
                  >
                     Forgotten Password
                  </Button>
                  <Button
                     variant="outline"
                     colorScheme="teal"
                     isLoading={formState.isSubmitting}
                     type="submit"
                  >
                     Login
                  </Button>
               </Flex>
            </form>
         </Flex>
      </LoginLayout>
   )
}

export default withUrqlClient(createUrqlClient)(Login)
