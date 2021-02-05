import argon2 from "argon2"
import { COOKIE_NAME } from "../constants"
import { OrmContext } from "../types/types"
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { User } from "../entities/User"
import { UserRegisterInput } from "./input-types/UserRegisterInput"
import { UserResponse } from './object-types/UserResponse'
import { validateRegister } from '../utils/validateRegister'
import { isAuth } from "../middleware/isAuth"
import { Collection } from "../entities/Collection"
import { CollectionResponse } from "./object-types/CollectionResponse"

@Resolver(User)
export class UserResolver {

   @Query(() => User, { nullable: true })
   @UseMiddleware(isAuth)
   async me(
      @Ctx() { em, req }: OrmContext
   ): Promise<User | null> {

      const repo = em.getRepository(User)

      const user = await repo.findOne({ _id: req.session.userId }, ['collections'])

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

      const hasUser = await repo.findOne({ $and: [email, username] })

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
      await em.populate(user, ['collections'])

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

   @Mutation(() => UserResponse)
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

   @Mutation(() => User, { nullable: true })
   async logout(
      @Ctx() { em, req, res }: OrmContext
   ): Promise<User | null> {

      const repo = em.getRepository(User)
      const user = await repo.findOne({ _id: req.session.userId })

      const logoutPromise: Promise<boolean> = new Promise((resolve) => {
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

      const result = await logoutPromise

      if (!result) {
         return null
      }

      return user
   }

   @Mutation(() => UserResponse)
   @UseMiddleware(isAuth)
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

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async follow(
      @Arg('targetUserId') targetUserId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(User)

      if (!req.session.userId) {
         return false
      }

      const meId = req.session['userId'].toString()

      const me = await repo.findOne({ id: meId })
      const targetUser = await repo.findOne({ id: targetUserId })

      if (!targetUser || !me) {
         return false
      }

      if (me.following.includes(targetUserId)) {
         return false
      }

      me.following.push(targetUserId)
      targetUser.followers.push(meId)

      await em.persistAndFlush(me)

      return true
   }

   @Query(() => [User])
   @UseMiddleware(isAuth)
   async following(
      @Ctx() { em, req }: OrmContext
   ): Promise<Promise<User | null>[] | null> {

      const repo = em.getRepository(User)

      if (!req.session.userId) {
         return null
      }

      const me = await repo.findOne({ id: req.session['userId'].toString() })

      if (!me) {
         return null
      }

      const following = me.following

      const allFollowing = following.map(async (userId) => {
         const user = await repo.findOne({ id: userId })
         return user
      })

      return allFollowing
   }

   @Query(() => [User])
   @UseMiddleware(isAuth)
   async followers(
      @Ctx() { em, req }: OrmContext
   ): Promise<Promise<User | null>[] | null> {

      const repo = em.getRepository(User)

      if (!req.session.userId) {
         return null
      }

      const me = await repo.findOne({ id: req.session['userId'].toString() })

      if (!me) {
         return null
      }

      const followers = me.followers

      const allFollowers = followers.map(async (userId) => {
         const user = await repo.findOne({ id: userId })
         return user
      })

      return allFollowers
   }

   @Query(() => [Collection], { nullable: true })
   @UseMiddleware(isAuth)
   async publicNotes(
      @Arg('targetUserId') targetUserId: string,
      @Ctx() { em }: OrmContext
   ): Promise<Collection[] | null> {

      const collectionsRepo = em.getRepository(Collection)

      const publicCollections = await collectionsRepo.find({ owner: targetUserId }, { filters: ['visibility'] })

      if (!publicCollections) {
         return null
      }

      return publicCollections
   }

   @Mutation(() => CollectionResponse)
   @UseMiddleware(isAuth)
   async savePublicCollection(
      @Arg('targetUserId') targetUserId: string,
      @Arg('collectionId') collectionId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<CollectionResponse> {

      const collectionsRepo = em.getRepository(Collection)
      const userRepo = em.getRepository(User)

      const publicCollections = await collectionsRepo.find({ owner: targetUserId }, { filters: ['visibility'] })

      if (publicCollections.length === 0) {
         return {
            error: {
               property: 'visibility',
               message: 'No public collections'
            }
         }
      }

      // Get the chosen collection
      const collectionToAdd = publicCollections.find((collection) => (collection.id === collectionId))

      if (!collectionToAdd) {
         return {
            error: {
               property: 'collection',
               message: 'Collection does not exist.'
            }
         }
      }

      // Save the collection to the currently logged in users collections
      const me = await userRepo.findOne({ id: req.session['userId']?.toString() })

      if (!me) {
         return {
            error: {
               property: 'user',
               message: 'User is not logged in.'
            }
         }
      }

      const { title, visibility } = collectionToAdd
      const collection = new Collection({ title, visibility })

      collection.owner = me
      me.collections.add(collection)
      await em.populate(collection, ['owner', 'lists'])

      await em.persistAndFlush(collection)

      return { collection }
   }

   @Query(() => [Collection], { nullable: true })
   async activityFeed(
      @Ctx() { em, req }: OrmContext
   ): Promise<Collection[] | null> {



      return null
   }

}