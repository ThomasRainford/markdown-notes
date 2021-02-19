interface Emphasis {
   italics: string
   bold: string
   strikeThrough: string
}

export interface Snippets {
   emphasis: Emphasis
   link: string
}

export const snippets: Snippets = {
   emphasis: {
      italics: "* *",
      bold: "** **",
      strikeThrough: "~~ ~~"
   },
   link: '[]()'
}