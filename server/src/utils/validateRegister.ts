import { UserResponse } from "src/resolvers/object-types/UserResponse"
import { UserRegisterInput } from "../resolvers/input-types/UserRegisterInput"

export const validateRegister = (registerInput: UserRegisterInput): UserResponse | null => {

   const { email, username, password } = registerInput

   // Validate email
   if (!email.includes('@')) {
      return {
         errors: [
            {
               field: 'email',
               message: 'Invalid email'
            }
         ]
      }
   }

   if (email.length < 5) {
      return {
         errors: [
            {
               field: 'email',
               message: 'Email needs to be 5 charaters longs.'
            }
         ]
      }
   }

   // Validate usernamme
   if (username.includes('@')) {
      return {
         errors: [
            {
               field: 'username',
               message: "Username cannot include an '@'' character."
            }
         ]
      }
   }

   if (username.length < 6) {
      return {
         errors: [
            {
               field: 'username',
               message: 'Username must be 6 characters or longer.'
            }
         ]
      }
   }

   // validate password.
   if (password.length < 8) {
      return {
         errors: [
            {
               field: 'password',
               message: 'Password must be 8 characters or longer.'
            }
         ]
      }
   }

   return null

}