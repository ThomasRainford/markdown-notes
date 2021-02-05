import { EntityManager, IDatabaseDriver, Connection, EntityName } from "@mikro-orm/core";
import { NotesList } from "../entities/NotesList";
import { Collection } from "../entities/Collection";
import { Error } from '../resolvers/object-types/Error'
import { ObjectId } from "@mikro-orm/mongodb";

export const validateTitle = async (owner: ObjectId | undefined, title: string, entity: EntityName<Collection | NotesList>, em: EntityManager<IDatabaseDriver<Connection>>): Promise<Error | null> => {

   const existingCollection = await em.getRepository(entity).findOne({ title, owner })
   if (existingCollection) {
      return {
         property: 'title',
         message: `Collection with title '${title}' already exisits.`,
      }
   }

   return null
}