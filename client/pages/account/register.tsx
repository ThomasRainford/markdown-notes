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
      <RegisterLayout>
         <Flex direction="column" h="100%" w="20em">
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl pb="1em">
                  <Input
                     name="email"
                     placeholder="Email"
                     autoComplete="off"
                     reg={register({ required: true })}
                  />
               </FormControl>

               <FormControl pb="1em">
                  <Input
                     name="username"
                     placeholder="Username"
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

               <Flex direction="column" pt="1em">
                  <Button
                     variant="outline"
                     colorScheme="teal"
                     isLoading={formState.isSubmitting}
                     type="submit"
                  >
                     Create Account
                  </Button>
               </Flex>
            </form>

         </Flex>
      </RegisterLayout >
   )
}

export default withUrqlClient(createUrqlClient)(Register)