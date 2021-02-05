import { NotesList } from "../entities/NotesList";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { NotesListResponse } from "./object-types/NotesListResponse";
import { OrmContext } from "../types/types";
import { Collection } from "../entities/Collection";
import { NoteResponse } from "./object-types/NoteResponse";
import { isAuth } from "../middleware/isAuth";
import { NoteInput } from "./input-types/NoteInput";
import { Note } from "./object-types/Note";
import { ListLocationInput } from "./input-types/ListLocationInput";
import { NoteLocationInput } from "./input-types/NoteLocationInput";
import { NoteUpdateInput } from "./input-types/NoteUpdateInput";
import { NotesListUpdateInput } from "./input-types/NotesListUpdateInput";
import { validateTitle } from "../utils/validateTitle";

@Resolver(NotesList)
export class NotesListResolver {

   /* Create */

   @Mutation(() => NotesListResponse)
   @UseMiddleware(isAuth)
   async createNotesList(
      @Arg('collectionId') collectionId: string,
      @Arg('title') title: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesListResponse> {

      const titleError = await validateTitle(title, NotesList, em)
      if (titleError) {
         return { error: titleError }
      }

      const collectionRepo = em.getRepository(Collection)

      const collection = await collectionRepo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return {
            error: {
               property: 'collectionId',
               message: 'Collection not found.'
            }
         }
      }

      const notesList = new NotesList({ title, notes: [] })
      await em.populate(notesList, ['collection'])

      notesList.collection = collection
      collection.lists.add(notesList)

      await em.persistAndFlush([notesList, collection])

      return { notesList }
   }

   @Mutation(() => NoteResponse)
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('listLocation') listLocation: ListLocationInput,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NoteResponse> {

      const { collectionId, listId } = listLocation

      const notesListRepo = em.getRepository(NotesList)
      const collectionsRepo = em.getRepository(Collection)

      const collection = await collectionsRepo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])
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

      await em.persistAndFlush(notesList)

      return { note }
   }

   /* Read */

   @Query(() => NotesList, { nullable: true })
   @UseMiddleware(isAuth)
   async notesList(
      @Arg('listLocation') listLocation: ListLocationInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesList | null> {

      const { collectionId, listId } = listLocation

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

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

      const collection = await collectionRepo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return null
      }

      const notesLists = collection?.lists.getItems()

      return notesLists
   }

   /* Update */

   @Mutation(() => NotesListResponse)
   @UseMiddleware(isAuth)
   async updateNotesList(
      @Arg('listLocation') listLocation: ListLocationInput,
      @Arg('notesListInput') notesListInput: NotesListUpdateInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesListResponse> {

      const { collectionId, listId } = listLocation
      const { title } = notesListInput

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return {
            error: {
               property: 'collection',
               message: 'Collection not found.'
            }
         }
      }

      const notesLists = collection.lists.getItems()

      const notesList = notesLists.filter((list) => {
         return list.id === listId
      })[0]

      if (!notesList) {
         return {
            error: {
               property: 'list',
               message: 'List note found'
            }
         }
      }

      if (title) {
         notesList.title = title
      }

      await em.persistAndFlush(notesList)

      return { notesList }
   }

   @Mutation(() => NoteResponse)
   @UseMiddleware(isAuth)
   async updateNote(
      @Arg('noteLocaton') noteLocation: NoteLocationInput,
      @Arg('noteInput') noteInput: NoteUpdateInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NoteResponse> {

      const { collectionId, listId, noteId } = noteLocation

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return {
            error: {
               property: 'collection',
               message: 'Collection not found.'
            }
         }
      }

      const notesLists = collection.lists.getItems()

      const notesList = notesLists.filter((list) => {
         return list.id === listId
      })[0]

      if (!notesList) {
         return {
            error: {
               property: 'list',
               message: 'List note found'
            }
         }
      }

      const note = notesList?.notes.find(note => note.id === noteId)

      if (!note) {
         return {
            error: {
               property: 'note',
               message: 'Note note found.'
            }
         }
      }

      Object.keys(note).forEach((key) => {
         if (key === 'title' || key === 'body') {
            if (noteInput[key]) {
               const updated = noteInput[key] as string
               note[key] = updated
            }
         }
      })

      await em.persistAndFlush(notesList)

      return { note }
   }

   /* Delete */

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteNotesList(
      @Arg('listLocation') listLocation: ListLocationInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const { collectionId, listId } = listLocation

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return false
      }

      const notesLists = collection.lists.getItems()

      const notesListToDelete = notesLists.filter((list) => (list.id === listId))[0]

      if (!notesListToDelete) {
         return false
      }

      const del = await em.nativeDelete(NotesList, { id: notesListToDelete.id })
      collection.lists.remove(notesListToDelete)

      if (del === 0) {
         return false
      }

      await em.persistAndFlush([collection, notesListToDelete])

      return true
   }

   @Mutation(() => Boolean)
   async deleteNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const { collectionId, listId, noteId } = noteLocation

      const repo = em.getRepository(Collection)

      const collection = await repo.findOne({ id: collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return false
      }

      const notesLists = collection.lists.getItems()

      const notesList = notesLists.filter((list) => (list.id === listId))[0]

      const noteToDelete = notesList?.notes.find(note => note.id === noteId)

      if (!noteToDelete || !notesList) {
         return false
      }

      const newNotes = notesList.notes.filter((note: Note) => {
         return note !== noteToDelete
      })

      notesList.notes = newNotes

      await em.persistAndFlush(notesList)

      return true
   }

   @Mutation(() => NotesListResponse)
   async moveList(
      @Arg('listLocation') listLocation: ListLocationInput,
      @Arg('newCollectionId') newCollectionId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesListResponse> {

      const collectionRepo = em.getRepository(Collection)
      const notesListRepo = em.getRepository(NotesList)

      // Get the notelist to be moved.
      const collection = await collectionRepo.findOne({ id: listLocation.collectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!collection) {
         return {
            error: {
               property: 'collection',
               message: 'Collection does not exist'
            }
         }
      }

      const notesList = await notesListRepo.findOne({ collection: collection.id })

      if (!notesList) {
         return {
            error: {
               property: 'notesList',
               message: 'List does not exist.'
            }
         }
      }

      // Get the new collection and change collection.
      const newCollection = await collectionRepo.findOne({ id: newCollectionId, owner: req.session.userId }, ['owner', 'lists'])

      if (!newCollection) {
         return {
            error: {
               property: 'newCollection',
               message: 'newCollection does not exist.'
            }
         }
      }

      notesList.collection = newCollection

      await em.persistAndFlush(notesList)

      return { notesList }
   }

}