import { Collection } from "../../entities/Collection";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ActivityFeedResponse {

   @Field()
   activity: string

   @Field(() => Collection)
   collection: Collection

}
