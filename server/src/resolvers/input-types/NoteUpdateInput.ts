
import { Field, InputType } from "type-graphql";

@InputType()
export class NoteUpdateInput {

   @Field({ nullable: true })
   title?: string

   @Field({ nullable: true })
   body?: string

}