import { User } from "../entities/User";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Collection } from "../entities/Collection";
import { CollectionResponse } from "./object-types/CollectionResponse";
import { validateVisibility } from "../utils/validateVisibility";
import { validateTitle } from "../utils/validateTitle";

@Resolver(Collection)
export class CollectionResolver {

   @Mutation(() => CollectionResponse)
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

      await em.persistAndFlush(collection)

      return { collection }

   }

}