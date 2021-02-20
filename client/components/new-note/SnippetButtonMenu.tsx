import { IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip, useClipboard } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'

interface Props {
   label: string
   icon: JSX.Element
   snippetItem: unknown
}

const SnippetButtonMenu: React.FC<Props> = ({ label, icon, snippetItem }) => {

   const [snippetValue, setSnippetValue] = useState<string>()
   const { hasCopied, onCopy } = useClipboard(snippetValue)

   useEffect(() => {
      onCopy()
   }, [snippetValue])

   return (

      <Menu>
         <Tooltip label={label} placement="right">
            <MenuButton
               as={IconButton}
               aria-label={label}
               icon={icon}
               variant="outline"
               colorScheme="black"
               fontSize="2xl"
               mb="0.15em"
            />
         </Tooltip>
         <MenuList>
            {
               Object.keys(snippetItem).map((snippet) => {
                  return (
                     <MenuItem
                        key={snippet}
                        onClick={() => {
                           setSnippetValue(snippetItem[snippet])
                        }}
                     >
                        {snippet}
                     </MenuItem>
                  )
               })
            }
         </MenuList>
      </Menu>
   )
}

export default SnippetButtonMenu
