import { Alert, AlertDescription, AlertIcon, Button, CloseButton, Flex, FormControl, FormErrorMessage, Input, Link, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordResetLayout from '../../components/account/PasswordResetLayout'
import { useResetPasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import NextLink from 'next/link'

interface Props {

}

const ResetPassword: NextPage = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState, setValue } = useForm()
   const [invalidPassword, setInvalidPassword] = useState<JSX.Element>(null)
   const [success, setSuccess] = useState<boolean>(false)

   //const [result, loginMutation] = useLoginMutation()
   const [result, resetPasswordMutation] = useResetPasswordMutation()

   const onSubmit = async (input: { password: string, confirmPassword: string }) => {
      const { password, confirmPassword } = input

      console.log(password, confirmPassword)
      if (password !== confirmPassword) {
         setInvalidPassword(
            <Alert status="error" mb="1em">
               <AlertIcon />
               <AlertDescription>Incorrect Password</AlertDescription>
               <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setInvalidPassword(null)}
               />
            </Alert>
         )
         setValue('password', '')
         setValue('confirmPassword', '')
         return
      }

      const response = await resetPasswordMutation({
         userId: router.query.id as string,
         token: router.query.token as string,
         newPassword: password
      })

      if (response.data?.resetPassword.user) {
         console.log('Success!')
         setSuccess(true)
         // router.push('/activity')
      }

      if (response.data?.resetPassword.errors) {
         console.log('Something went wrong')
         setInvalidPassword(
            <Alert status="error" mb="1em">
               <AlertIcon />
               <AlertDescription>Something went wrong...</AlertDescription>
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
      <PasswordResetLayout header="Reset Password">
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
                     name="confirmPassword"
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
                     variant="outline"
                     colorScheme="teal"
                     isLoading={formState.isSubmitting}
                     type="submit"
                  >
                     Submit
                  </Button>
                  {success &&
                     <>
                        <Text>Reset Successfull!</Text>
                        <NextLink href="/account/login">
                           <Link>Click to Login</Link>
                        </NextLink>
                     </>
                  }
               </Flex>
            </form>
         </Flex>
      </PasswordResetLayout>
   )
}

export default withUrqlClient(createUrqlClient)(ResetPassword)
