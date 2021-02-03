import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid'
import { NoteInput } from "../input-types/NoteInput";

@ObjectType() // type-graphql
export class Note {

   @Field(() => ID)
   id = uuidv4()

   @Field()
   title: string

   @Field()
   body: string // This will be the markdown text

   @Field(() => Date)
   createdAt = new Date()

   @Field(() => Date)
   updatedAt = new Date()

   constructor({ title, body }: NoteInput) {
      this.title = title
      this.body = body
   }

}