import { Entity, PrimaryKey, Property, SerializedPrimaryKey, Collection as OrmCollection, ManyToOne, OneToMany } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { CollectionInput } from "../resolvers/input-types/CollectionInput";
import { Visibility } from "../types/types";
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
   @ManyToOne()
   owner: User

   @Field()
   @Property()
   title: string

   @Field(() => [NotesList])
   @OneToMany(() => NotesList, notesList => notesList.collection)
   collection = new OrmCollection<NotesList>(this)

   @Field(() => Visibility)
   @Property()
   visibility: Visibility

   @Field(() => Date)
   @Property()
   createdAt = new Date()

   @Field(() => Date)
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ title, visibility }: CollectionInput) {
      this.title = title
      this.visibility = visibility
   }

}