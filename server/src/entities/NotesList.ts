import { Entity, ManyToOne, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { NotesListInput } from "../resolvers/input-types/NotesListInput";
import { Note } from "../resolvers/object-types/Note";
import { Visibility } from "../types/types";
import { Field, ID, ObjectType } from "type-graphql";
import { Collection } from "./Collection";

@ObjectType()
@Entity()
export class NotesList {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @SerializedPrimaryKey()
   id: string

   @Field()
   @Property()
   title: string

   @Field(() => [Note])
   @Property()
   notes: Note[]

   @Field(() => Collection)
   @ManyToOne()
   collection: Collection

   @Field(() => Visibility)
   @Property()
   visibility: Visibility

   @Field(() => Date)
   @Property()
   createdAt = new Date()

   @Field(() => Date)
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ title, notes, visibility }: NotesListInput) {
      this.title = title
      this.notes = notes
      this.visibility = visibility
   }

}