import { IconButton, Tooltip, useClipboard } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Props {
   label: string
   icon: JSX.Element
   snippetItem: string
}

const SnippetButton: React.FC<Props> = ({ label, icon, snippetItem }) => {

   const [snippetValue, setSnippetValue] = useState<string>()
   const { hasCopied, onCopy } = useClipboard(snippetValue)

   useEffect(() => {
      onCopy()
   }, [snippetValue])

   return (
      <Tooltip label={label} placement="right">
         <IconButton
            aria-label={label}
            color="brand.300"
            icon={icon}
            variant="outline"
            fontSize="2xl"
            mb="0.15em"
            onClick={() => {
               setSnippetValue(snippetItem)
            }}
         />
      </Tooltip>
   )
}

export default SnippetButton
