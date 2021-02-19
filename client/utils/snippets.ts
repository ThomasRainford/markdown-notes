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

interface Table {
   create: (rows: number, columns: number) => string
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
      create: (rows: number, columns: number) => { // TODO: implement this.
         return ''
      }
   },
   blockquotes: '>',
   htmlElement: '< ></ >',
   horizontalRule: "***\n"

}