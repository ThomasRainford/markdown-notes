import { Snippets } from "../types/types"


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
      inline: '` `',
      block: '```<language here>\n\n```'
   },
   table: {
      create: ({ rows, columns }) => {

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