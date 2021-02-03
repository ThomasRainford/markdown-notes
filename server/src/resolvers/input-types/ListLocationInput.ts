import { Field, InputType } from "type-graphql";

@InputType()
export class ListLocationInput {

   @Field()
   collectionId: string

   @Field()
   listId: string

}