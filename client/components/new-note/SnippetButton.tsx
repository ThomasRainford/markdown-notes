import { Tooltip, IconButton } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'
import { MdEdit } from 'react-icons/md'

interface Props {
   label: string
   icon: IconType
}

const SnippetButton = ({ label, icon }) => {
   return (
      <Tooltip label={label} placement="right">
         <IconButton
            aria-label={label}
            icon={icon}
            variant="outline"
            colorScheme="black"
            fontSize="2xl"
            mb="0.15em"
         />
      </Tooltip>
   )
}

export default SnippetButton
