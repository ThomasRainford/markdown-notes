import { Visibility } from "src/types/types";
import { Field, InputType } from "type-graphql";
import { Note } from "../object-types/Note";

@InputType()
export class NotesListInput {

   @Field()
   title: string

   @Field(() => [Note])
   notes: Note[]

   @Field()
   visibility: Visibility

}