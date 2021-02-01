import { Field, InputType } from "type-graphql"

@InputType()
export class UserRegisterInput {

   @Field()
   email: string

   @Field()
   username: string

   @Field()
   password: string

}
