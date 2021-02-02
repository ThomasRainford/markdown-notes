import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Error {

   @Field()
   property: string

   @Field()
   message: string

}