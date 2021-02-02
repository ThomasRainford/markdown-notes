import { Visibility } from "src/types/types";
import { Field, InputType } from "type-graphql";

@InputType()
export class CollectionInput {

   @Field()
   title: string

   @Field()
   visibility: Visibility

}