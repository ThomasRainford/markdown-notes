import { NotesList } from "../entities/NotesList";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
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
      await em.populate(notesList, ['collection'])

      notesList.collection = collection
      collection.lists.add(notesList)

      em.persistAndFlush([notesList, collection])

      return { notesList }
   }

   @Mutation(() => NoteResponse)
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('collectionId') collectionId: string,
      @Arg('listId') listId: string,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NoteResponse> {

      const notesListRepo = em.getRepository(NotesList)
      const collectionsRepo = em.getRepository(Collection)

      const collection = await collectionsRepo.findOne({ id: collectionId, owner: req.session.userId }, ['owner'])
      const notesList = await notesListRepo.findOne({ id: listId, collection })

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

   @Query(() => NotesList, { nullable: true })
   @UseMiddleware(isAuth)
   async notesList(
      @Arg('collectionId') collectionId: string,
      @Arg('listId') listId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesList | null> {

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['lists'])

      if (!collection) {
         return null
      }

      const notesLists = collection.lists.getItems()

      const list = notesLists.filter((list) => {
         return list.id === listId
      })

      return list[0]
   }

   @Query(() => [NotesList], { nullable: true })
   @UseMiddleware(isAuth)
   async notesLists(
      @Arg('collectionId') collectionId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesList[] | null> {

      const collectionRepo = em.getRepository(Collection)

      const collection = await collectionRepo.findOne({ id: collectionId, owner: req.session.userId }, ['lists'])

      if (!collection) {
         return null
      }

      const notesLists = collection?.lists.getItems()

      return notesLists
   }

}