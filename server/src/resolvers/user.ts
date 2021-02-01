import argon2 from "argon2"
import { COOKIE_NAME } from "../constants"
import { OrmContext } from "../types/types"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../entities/User"
import { UserRegisterInput } from "./input-types/UserRegisterInput"
import { UserResponse } from './object-types/UserResponse'
import { validateRegister } from '../utils/validateRegister'

@Resolver(User)
export class UserResolver {

   @Query(() => User, { nullable: true })
   async me(
      @Ctx() { em, req }: OrmContext
   ): Promise<User | null> {

      // First check if the user is logged in
      // before attempting to query them.
      if (!req.session.userId) {
         return null
      }

      const repo = em.getRepository(User)

      const user = await repo.findOne({ _id: req.session.userId })

      return user
   }

   @Mutation(() => UserResponse)
   async register(
      @Arg('registerInput') registerInput: UserRegisterInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<UserResponse> {

      const { email, username, password } = registerInput
      const repo = em.getRepository(User)

      // Validate register info.
      const errors: UserResponse | null = validateRegister(registerInput)
      if (errors) {
         return errors
      }

      const hasUser = await repo.findOne({ email, username })

      if (hasUser) {
         return {
            errors: [
               {
                  field: 'registerInput',
                  message: 'Already registered'
               }
            ]
         }
      }

      const hashedPassword = await argon2.hash(password)
      const user = new User({
         email,
         username,
         password: hashedPassword,
      })

      await em.persistAndFlush(user)

      const userIndb = await repo.findOne({ email: user.email })
      const userId = userIndb?._id

      // Stores user id session
      // Gives a cookie to the user
      // Logs them in once registered
      req.session.userId = userId

      return {
         user
      }
   }

   @Query(() => UserResponse)
   async login(
      @Arg('usernameOrEmail') usernameOrEmail: string,
      @Arg('password') password: string,
      @Ctx() { req, em }: OrmContext
   ): Promise<UserResponse> {

      const repo = em.getRepository(User)

      const isEmail = usernameOrEmail.includes('@')
      const user = await repo.findOne(isEmail
         ? {
            email: usernameOrEmail
         } : {
            username: usernameOrEmail
         })

      // Validate usernameOrEmail.
      if (!user) {
         return {
            errors: [
               {
                  field: 'usernameOrEmail',
                  message: isEmail ? 'Email does not exist.' : 'Username does not exist.'
               }
            ]
         }
      }

      // Validate password.
      const valid = await argon2.verify(user.password, password)
      if (!valid) {
         return {
            errors: [
               {
                  field: 'password',
                  message: 'Incorrect Password.'
               }
            ]
         }
      }

      // log the user in
      req.session.userId = user._id

      return {
         user
      }
   }

   @Query(() => Boolean)
   async logout(
      @Ctx() { req, res }: OrmContext
   ): Promise<boolean> {
      return new Promise((resolve) => {
         req.session.destroy((error) => {
            res.clearCookie(COOKIE_NAME)
            if (error) {
               console.log(error)
               resolve(false)
               return
            }
            resolve(true)
         })
      })
   }

   @Mutation(() => UserResponse)
   async updateUser(
      @Ctx() { em, req }: OrmContext,
      @Arg('username', { nullable: true }) username?: string,
      @Arg('password', { nullable: true }) password?: string,
   ): Promise<UserResponse> {

      // Check if both args exist.
      if (!username && !password) {
         return {
            errors: [
               {
                  field: 'username & password',
                  message: 'Requires either username or password or both.'
               }
            ]
         }
      }

      const repo = em.getRepository(User)

      const user = await repo.findOne({ _id: req.session.userId })

      // If the user is not logged in then send error.
      // Otherwise update fields.
      if (!user) {
         return {
            errors: [
               {
                  field: 'req.session.userId',
                  message: 'Please login'
               }
            ]
         }
      } else {
         if (username) {
            user.username = username
         }
         if (password) {
            user.password = await argon2.hash(password)
         }

         em.persistAndFlush(user)
      }

      return {
         user
      }
   }

}