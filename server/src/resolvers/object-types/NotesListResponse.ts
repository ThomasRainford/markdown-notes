import { NotesList } from "../../entities/NotesList";
import { Field, ObjectType } from "type-graphql";
import { Error } from './Error'

@ObjectType()
export class NotesListResponse {

   @Field(() => NotesList, { nullable: true })
   notesList?: NotesList

   @Field(() => Error, { nullable: true })
   error?: Error

}