import Markdown from 'markdown-to-jsx'
import React from 'react'
import { Text } from "@chakra-ui/react"

interface Props {
   markdown: string
}

const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
   return (
      <Markdown
         options={{
            overrides: {
               h1: {
                  component: Text,
                  props: {
                     fontSize: "4xl",
                     fontWeight: "bold"
                  }
               },
               h2: {
                  component: Text,
                  props: {
                     fontSize: "3xl",
                     fontWeight: "bold"
                  }
               },
               h3: {
                  component: Text,
                  props: {
                     fontSize: "2xl",
                     fontWeight: "bold"
                  }
               },
               h4: {
                  component: Text,
                  props: {
                     fontSize: "xl",
                     fontWeight: "bold"
                  }
               },
               h5: {
                  component: Text,
                  props: {
                     fontSize: "lg",
                     fontWeight: "bold"
                  }
               },
               h6: {
                  component: Text,
                  props: {
                     fontSize: "md",
                     fontWeight: "bold"
                  }
               }
            }
         }}>
         {markdown}
      </Markdown>

   )
}

export default MarkdownRenderer