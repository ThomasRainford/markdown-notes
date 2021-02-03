import { User } from "../entities/User";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Collection } from "../entities/Collection";
import { CollectionResponse } from "./object-types/CollectionResponse";
import { validateVisibility } from "../utils/validateVisibility";
import { validateTitle } from "../utils/validateTitle";
import { isAuth } from "../middleware/isAuth";

@Resolver(Collection)
export class CollectionResolver {

   @Mutation(() => CollectionResponse)
   @UseMiddleware(isAuth)
   async createCollection(
      @Arg('title') title: string,
      @Arg('visibility') visibility: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<CollectionResponse> {

      const visibilityError = validateVisibility(visibility)
      if (visibilityError) {
         return visibilityError
      }

      const titleError = await validateTitle(title, em)
      if (titleError) {
         return titleError
      }

      const repo = em.getRepository(User)

      const collection = new Collection({ title, visibility })

      const user = await repo.findOne({ id: req.session['userId']?.toString() })

      if (!user) {
         return {
            error: {
               property: 'user',
               message: 'User is not logged in.'
            }
         }
      }

      collection.owner = user
      user.collections.add(collection)

      await em.persistAndFlush(collection)

      return { collection }

   }

   @Query(() => CollectionResponse)
   @UseMiddleware(isAuth)
   async collection(
      @Ctx() { em, req }: OrmContext,
      @Arg('id', { nullable: true }) id?: string,
      @Arg('title', { nullable: true }) title?: string
   ): Promise<CollectionResponse> {

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ $or: [{ title }, { id }], $and: [{ owner: req.session.userId }] }, ['owner'])

      if (!collection) {
         return {
            error: {
               property: 'collection',
               message: 'Collection does not exisit.'
            }
         }
      }

      return { collection }
   }

   @Query(() => [Collection])
   @UseMiddleware(isAuth)
   async collections(
      @Ctx() { em, req }: OrmContext
   ): Promise<Collection[] | null> {

      const repo = em.getRepository(Collection)

      const collections = repo.find({ owner: req.session.userId }, ['owner'])

      if (!collections) {
         return null
      }

      return collections
   }

   @Mutation(() => CollectionResponse)
   @UseMiddleware(isAuth)
   async update(
      @Arg('id') id: string,
      @Arg('title') title: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<CollectionResponse> {

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id, owner: req.session.userId }, ['owner'])

      if (!collection) {
         return {
            error: {
               property: 'collection',
               message: 'Collection does not exist.'
            }
         }
      }

      collection.title = title

      return { collection }
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async delete(
      @Arg('id') id: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(Collection)

      const listToDelete = await repo.findOne({ id, owner: req.session.userId }, ['owner'])

      const didDelete = await repo.nativeDelete({ id: listToDelete?.id })
      if (didDelete === 0) {
         return false
      }

      return true
   }

}