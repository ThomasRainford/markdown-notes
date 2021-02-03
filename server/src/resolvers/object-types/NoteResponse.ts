import { Field, ObjectType } from "type-graphql";
import { Note } from "./Note";
import { Error } from './Error'

@ObjectType()
export class NoteResponse {

   @Field(() => Note, { nullable: true })
   note?: Note

   @Field(() => Error, { nullable: true })
   error?: Error

}