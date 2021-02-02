import { Collection } from "../../entities/Collection";
import { Field, ObjectType } from "type-graphql";
import { Error } from "./Error";

@ObjectType()
export class CollectionResponse {

   @Field(() => Collection, { nullable: true })
   collection?: Collection

   @Field(() => Error, { nullable: true })
   error?: Error

}