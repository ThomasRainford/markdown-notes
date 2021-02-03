import { Field, InputType } from "type-graphql";

@InputType()
export class NoteInput {

   @Field()
   title: string

   @Field()
   body: string

}