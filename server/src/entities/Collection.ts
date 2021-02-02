import { Entity, PrimaryKey, Property, SerializedPrimaryKey, Collection as OrmCollection, ManyToOne, OneToMany } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { CollectionInput } from "src/resolvers/input-types/CollectionInput";
import { Visibility } from "src/types/types";
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

   @Field()
   @Property()
   visibility: Visibility

   @Field()
   @Property()
   createdAt = new Date()

   @Field()
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ title, visibility }: CollectionInput) {
      this.title = title
      this.visibility = visibility
   }

}