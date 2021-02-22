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
interface Snippets {
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

export const snippets: Snippets = {
   heading: {
      h1: "# ",
      h2: "## ",
      h3: "### ",
      h4: "#### ",
      h5: "##### ",
      h6: "###### ",
   },
   emphasis: {
      italics: "* *",
      bold: "** **",
      strikeThrough: "~~ ~~"
   },
   link: '[]()',
   lists: {
      ordered: "1. ",
      orderedSublist: "⋅⋅1. ",
      unordered: "* ",
      unorderedSublist: "⋅⋅* ",
      paragraph: "⋅⋅⋅ "
   },
   images: {
      inline: "![]()",
   },
   code: {
      inline: ` `,
      block: '```<language here>\n\n```'
   },
   table: {
      create: ({ rows, columns }) => { // TODO: implement this.

         const tableBlock = '|   '
         const headerBottom = '|:---:'
         const rowEnd = '|\n'

         let table = ''
         for (let row = -2; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
               if (row < 0) {
                  row === -2 ? table += tableBlock : table += headerBottom
               }
               else {
                  table += tableBlock
               }
            }
            table += rowEnd
         }
         return table
      }
   },
   blockquotes: '>',
   htmlElement: '< ></ >',
   horizontalRule: "***\n"
}