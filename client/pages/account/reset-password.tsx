import { Flex, FormControl, Input, FormErrorMessage, Button, Alert, AlertDescription, AlertIcon, CloseButton } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ResetPasswordLayout from '../../components/account/ResetPasswordLayout'
import { LoginMutationVariables } from '../../generated/graphql'
import register from './register'

interface Props {

}

const ResetPassword: NextPage = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()
   const [invalidPassword, setInvalidPassword] = useState<JSX.Element>(null)

   //const [result, loginMutation] = useLoginMutation()

   const onSubmit = async ({ usernameOrEmail, password }: LoginMutationVariables) => {

      const response = await loginMutation({ usernameOrEmail, password })
      if (response.data?.login.user) {
         console.log('Success!')
         router.push('/activity')
      }

      if (response.data?.login.errors) {
         console.log('Invalid login')
         setInvalidPassword(
            <Alert status="error" mb="1em">
               <AlertIcon />
               <AlertDescription>Incorrect Login</AlertDescription>
               <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setInvalidPassword(null)}
               />
            </Alert>
         )
      }

   }


   return (
      <ResetPasswordLayout>
         <Flex direction="column" h="100%" w="20em">
            {invalidPassword}
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl pb="1em">
                  <Input
                     id="password"
                     name="password"
                     placeholder="Password"
                     type="password"
                     ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                     {errors.password && errors.password.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl pb="1em">
                  <Input
                     id="confirmPassword"
                     name="conformPassword"
                     placeholder="Confirm Password"
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
      </ResetPasswordLayout>
   )
}

export default ResetPassword
