import { Collection, Note, NotesList } from "../generated/graphql";

export interface NoteLocation {
   collection: Collection
   list: NotesList
}

export interface ExactNoteLocation {
   noteLocation: NoteLocation & { note: Note }
}

// Snippets types.
interface Heading {
   h1: string
   h2: string
   h3: string
   h4: string
   h5: string
   h6: string
}

interface Emphasis {
   italics: string
   bold: string
   strikeThrough: string
}

interface Lists {
   ordered: string
   orderedSublist: string
   unordered: string
   unorderedSublist: string
   paragraph: string
}

interface Images {
   inline: string
}

interface Code {
   inline: string
   block: string
}

export interface TableDimensions {
   rows: number
   columns: number
}

interface Table {
   create: (dimensions: TableDimensions) => string
}
export interface Snippets {
   heading: Heading
   emphasis: Emphasis
   link: string
   lists: Lists
   images: Images
   code: Code
   table: Table
   blockquotes: string
   htmlElement: string
   horizontalRule: string
}