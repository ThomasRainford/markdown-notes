import { Collection, Note, NotesList } from "../generated/graphql";

export interface NoteLocation {
   collection: Collection
   list: NotesList
}

export interface ExactNoteLocation {
   noteLocation: NoteLocation & { note: Note }
}