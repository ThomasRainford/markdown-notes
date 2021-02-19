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

export interface Snippets {
   heading: Heading
   emphasis: Emphasis
   link: string
   lists: Lists
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
   }
}