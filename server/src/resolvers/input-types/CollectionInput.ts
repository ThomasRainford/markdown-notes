import { Field, InputType } from "type-graphql";
import { Visibility } from "../object-types/Visibility";

@InputType()
export class CollectionInput {

   @Field()
   title: string

   @Field()
   visibility: Visibility

}