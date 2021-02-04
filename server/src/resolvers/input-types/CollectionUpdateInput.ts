import { Field, InputType } from "type-graphql";

@InputType()
export class CollectionUpdateInput {

   @Field({ nullable: true })
   title?: string

   @Field({ nullable: true })
   visibility?: string

}