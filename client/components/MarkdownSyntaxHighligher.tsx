import React from 'react'
import SyntaxHighligher from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {

}

const MarkdownSyntaxHighligher = ({ value, language }) => {
   return (
      <SyntaxHighligher language={language} style={dark}>
         {value}
      </SyntaxHighligher>
   )
}

export default MarkdownSyntaxHighligher