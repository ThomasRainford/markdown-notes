import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'

interface Props {
   label: string
   icon: IconType
   snippetItem: unknown
   handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SnippetButtonMenu = ({ label, icon, snippetItem, handleClick }) => {
   return (
      <Menu>
         <MenuButton
            as={IconButton}
            aria-label={label}
            icon={icon}
            variant="outline"
            colorScheme="black"
            fontSize="2xl"
            mb="0.15em"
            onClick={handleClick}
         />
         <MenuList>
            {
               Object.keys(snippetItem).map((snippet) => {
                  return (
                     <MenuItem
                        key={snippet}
                        onClick={() => {

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
