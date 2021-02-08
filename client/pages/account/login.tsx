import { Flex, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import LoginLayout from '../../components/account/LoginLayout'
import { useLoginMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {

}

const Login = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()

   const [result, loginMutation] = useLoginMutation()

   const onSubmit = () => {

   }

   return (
      <LoginLayout>
         <Flex h="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl pb="1em">
                  <Input
                     name="usernameOrEmail"
                     placeholder="Username or Email"
                     autoComplete="off"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <FormControl pb="1em">
                  <Input
                     name="password"
                     placeholder="Password"
                     type="password"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <Button variant="solid">
                  Forgotten Password
               </Button>

               <Button
                  variant="outline"
                  colorScheme="teal"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  mt='10%'
               >
                  Login
               </Button>
            </form>

         </Flex>
      </LoginLayout>
   )
}

export default withUrqlClient(createUrqlClient)(Login)
