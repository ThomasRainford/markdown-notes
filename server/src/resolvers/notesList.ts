import { NotesList } from "../entities/NotesList";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { NotesListResponse } from "./object-types/NotesListResponse";
import { OrmContext } from "../types/types";
import { validateVisibility } from "../utils/validateVisibility";
import { Collection } from "../entities/Collection";
import { NoteResponse } from "./object-types/NoteResponse";
import { isAuth } from "../middleware/isAuth";
import { NoteInput } from "./input-types/NoteInput";
import { Note } from "./object-types/Note";

@Resolver(NotesList)
export class NotesListResolver {

   @Mutation(() => NotesListResponse)
   @UseMiddleware(isAuth)
   async createNotesList(
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
      await em.populate(notesList, ['owner'])

      notesList.owner = collection.owner
      notesList.collection = collection
      collection.collection.add(notesList)

      em.persist([notesList, collection])
      em.flush()

      return { notesList }
   }

   @Mutation(() => NoteResponse)
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('listId') listId: string,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NoteResponse> {

      const repo = em.getRepository(NotesList)

      const notesList = await repo.findOne({ id: listId, owner: req.session.userId }, ['owner'])

      if (!notesList) {
         return {
            error: {
               property: 'notesList',
               message: 'Notes list note found'
            }
         }
      }

      const note = new Note(noteInput)
      notesList.notes.push(note)

      em.persistAndFlush(notesList)

      return { note }
   }

}