import { NotesList } from "../entities/NotesList";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { NotesListResponse } from "./object-types/NotesListResponse";
import { OrmContext } from "../types/types";
import { validateVisibility } from "../utils/validateVisibility";
import { Collection } from "../entities/Collection";

@Resolver(NotesList)
export class NotesListResolver {

   @Mutation(() => NotesListResponse)
   async create(
      @Arg('collectionId') collectionId: string,
      @Arg('title') title: string,
      @Arg('visibility') visibility: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesListResponse> {

      const visibilityError = validateVisibility(visibility)
      if (visibilityError) {
         return {
            error: visibilityError
         }
      }

      const collectionRepo = em.getRepository(Collection)

      const collection = await collectionRepo.findOne({ id: collectionId, owner: req.session.userId }, ['owner'])

      if (!collection) {
         return {
            error: {
               property: 'collectionId',
               message: 'Collection not found.'
            }
         }
      }

      const notesList = new NotesList({ title, notes: [], visibility })
      notesList.collection = collection
      collection.collection.add(notesList)

      em.persist([notesList, collection])
      em.flush()

      return { notesList }
   }

}