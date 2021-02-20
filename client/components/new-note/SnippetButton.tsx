import { Tooltip, IconButton, useClipboard } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { MdEdit } from 'react-icons/md'

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
            icon={icon}
            variant="outline"
            colorScheme="black"
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
