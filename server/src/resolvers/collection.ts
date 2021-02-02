import { User } from "src/entities/User";
import { OrmContext, Visibility } from "../types/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Collection } from "../entities/Collection";
import { CollectionResponse } from "./object-types/CollectionResponse";

@Resolver(Collection)
export class CollectionResolver {

   @Mutation(() => CollectionResponse)
   async createCollection(
      @Arg('title') title: string,
      @Arg('visibility') visibility: Visibility,
      @Ctx() { em, req }: OrmContext
   ): Promise<CollectionResponse> {

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