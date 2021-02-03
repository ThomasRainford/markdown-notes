import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { CollectionResponse } from "src/resolvers/object-types/CollectionResponse";
import { Collection } from "../entities/Collection";

export const validateTitle = async (title: string, em: EntityManager<IDatabaseDriver<Connection>>): Promise<CollectionResponse | null> => {

   const existingCollection = await em.getRepository(Collection).findOne({ title })
   if (existingCollection) {
      return {
         error: {
            property: 'titile',
            message: `Collection with title '${title}' already exisits.`,
         }
      }
   }

   return null
}