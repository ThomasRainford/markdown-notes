import { Collection, NotesList } from "../generated/graphql";

export interface NoteLocation {
   collection: Collection
   list: NotesList
}