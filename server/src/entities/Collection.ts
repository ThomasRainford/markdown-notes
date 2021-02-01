import { Entity, PrimaryKey, Property, SerializedPrimaryKey, Collection as OrmCollection } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { NotesList } from "./NotesList";
import { User } from "./User";

@ObjectType()
@Entity()
export class Collection {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @SerializedPrimaryKey()
   id: string

   @Field(() => User)
   @Property()
   owner: User

   @Field(() => [NotesList])
   @Property()
   collection = new OrmCollection<NotesList>(this)

   @Field()
   @Property()
   visibility: 'public' | 'private'

   @Field()
   @Property()
   createdAt = new Date()

   @Field()
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

}