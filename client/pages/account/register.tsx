import { Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import RegisterLayout from '../../components/account/RegisterLayout'
import { useRegisterMutation, UserRegisterInput } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'


interface Props {

}

const Register = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()

   const [result, registerMutation] = useRegisterMutation()

   const onSubmit = async (registerInput: UserRegisterInput) => {

      const response = await registerMutation({ registerInput })
      if (response.data?.register.user) {
         console.log('Success!')
         router.push('/activity')
      }

   }

   return (
      <RegisterLayout>
         <Flex direction="column" h="100%" w="20em">
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormControl id="email" pb="1em">
                  <Input
                     name="email"
                     placeholder="Email"
                     autoComplete="off"
                     ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                     {errors.email && errors.email.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl id="username" pb="1em">
                  <Input
                     name="username"
                     placeholder="Username"
                     autoComplete="off"
                     ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                     {errors.username && errors.username.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl id="password" pb="1em">
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

export default withUrqlClient(createUrqlClient, { ssr: false })(Register)