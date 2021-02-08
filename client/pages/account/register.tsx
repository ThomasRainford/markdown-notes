import { Button, Divider, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import RegisterLayout from '../../components/account/RegisterLayout'
import { useRegisterMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'


interface Props {

}

const Register = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()

   const [result, registerMutation] = useRegisterMutation()

   const onSubmit = () => {

   }

   return (
      <RegisterLayout heading="Create An Account">
         <Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl pb="1em">
                  <FormLabel>Email</FormLabel>
                  <Input
                     name="email"
                     placeholder="Email"
                     autoComplete="off"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <FormControl pb="1em">
                  <FormLabel>Username</FormLabel>
                  <Input
                     name="username"
                     placeholder="Username"
                     autoComplete="off"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <FormControl pb="1em">
                  <FormLabel>Password</FormLabel>
                  <Input
                     name="password"
                     placeholder="Password"
                     type="password"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <Button
                  variant="outline"
                  colorScheme="teal"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  mt='10%'
               >
                  Create Account
               </Button>
            </form>

            <Flex justify="center" align="center" pl="1.5em">
               <Text fontSize="lg" pr="1.5em">or</Text>
               <Button
                  variant="solid"
                  colorScheme="teal"
               >
                  Login
               </Button>
            </Flex>

         </Flex>
      </RegisterLayout>
   )
}

export default withUrqlClient(createUrqlClient)(Register)