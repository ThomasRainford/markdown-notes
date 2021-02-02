import { Field, InputType } from "type-graphql";
import { Note } from "../object-types/Note";
import { Visibility } from "../object-types/Visibility";

@InputType()
export class NotesListInput {

   @Field()
   title: string

   @Field(() => [Note])
   notes: Note[]

   @Field()
   visibility: Visibility

}