import { Field, InputType } from "type-graphql";

@InputType()
export class NoteLocationInput {

   @Field()
   collectionId: string

   @Field()
   listId: string

   @Field()
   noteId: string

}