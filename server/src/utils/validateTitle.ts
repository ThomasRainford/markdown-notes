import { EntityManager, IDatabaseDriver, Connection, EntityName } from "@mikro-orm/core";
import { NotesList } from "../entities/NotesList";
import { Collection } from "../entities/Collection";
import { Error } from '../resolvers/object-types/Error'

export const validateTitle = async (title: string, entity: EntityName<Collection | NotesList>, em: EntityManager<IDatabaseDriver<Connection>>): Promise<Error | null> => {

   const existingCollection = await em.getRepository(entity).findOne({ title })
   if (existingCollection) {
      return {
         property: 'title',
         message: `Collection with title '${title}' already exisits.`,
      }
   }

   return null
}