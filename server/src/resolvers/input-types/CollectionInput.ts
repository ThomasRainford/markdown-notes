import { Field, InputType } from "type-graphql";

@InputType()
export class CollectionInput {

   @Field()
   title: string

   @Field()
   visibility: 'public' | 'private'

}