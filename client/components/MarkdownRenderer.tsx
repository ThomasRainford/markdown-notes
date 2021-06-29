import Markdown from 'markdown-to-jsx'
import React from 'react'
import { Text } from "@chakra-ui/react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
   markdown: string
}

interface CodeProps {
   className: string
}

const Code: React.FC<CodeProps> = ({ className, children }) => {
   const language = className?.replace("lang-", "");

   return (
      <>
         {language ?
            <SyntaxHighlighter language={language} style={a11yDark}>
               {children}
            </SyntaxHighlighter>
            : <code>{children}</code>
         }
      </>
   );
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
               },
               code: {
                  component: Code,
               },
            }
         }}>
         {markdown}
      </Markdown>

   )
}

export default MarkdownRenderer