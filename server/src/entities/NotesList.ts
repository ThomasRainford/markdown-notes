import { Entity, ManyToOne, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { NotesListInput } from "src/resolvers/input-types/NotesListInput";
import { Note } from "src/resolvers/object-types/Note";
import { Visibility } from "src/types/types";
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

   @Field()
   @Property()
   visibility: Visibility

   @Field()
   @Property()
   createdAt = new Date()

   @Field()
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ title, notes, visibility }: NotesListInput) {
      this.title = title
      this.notes = notes
      this.visibility = visibility
   }

}