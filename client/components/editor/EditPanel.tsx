import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BiHeading, BiCodeAlt, BiMoveHorizontal } from 'react-icons/bi'
import { Ri4KFill } from 'react-icons/ri'
import { FiLink } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiFillCode } from 'react-icons/ai'
import { BsImage, BsBlockquoteLeft, BsTable } from 'react-icons/bs'
import SnippetButton from './SnippetButton'
import SnippetButtonMenu from './SnippetButtonMenu'
import { snippets } from '../../utils/snippets'
import SnippetButtonPopover from './SnippetButtonPopover'

interface Props {

}

const EditPanel = ({ }) => {

   return (
      <Flex direction="row" bg="brand.100">
         <Flex direction="row" align="center">
            <SnippetButtonMenu
               label="Heading"
               icon={<BiHeading />}
               snippetItem={snippets.heading}
            />
            <SnippetButtonMenu
               label="Emphasis"
               icon={<Ri4KFill />}
               snippetItem={snippets.emphasis}
            />
            <SnippetButton
               label="Link"
               icon={<FiLink />}
               snippetItem={snippets.link}
            />
            <SnippetButtonMenu
               label="Lists"
               icon={<AiOutlineUnorderedList />}
               snippetItem={snippets.lists}
            />
            <SnippetButtonMenu
               label="Images"
               icon={<BsImage />}
               snippetItem={snippets.images}
            />
            <SnippetButtonMenu
               label="Code"
               icon={<AiFillCode />}
               snippetItem={snippets.code}
            />
            <SnippetButtonPopover
               label="Table"
               icon={<BsTable />}
            />
            <SnippetButton
               label="Block quote"
               icon={<BsBlockquoteLeft />}
               snippetItem={snippets.blockquotes}
            />
            <SnippetButton
               label="HTML Element"
               icon={<BiCodeAlt />}
               snippetItem={snippets.htmlElement}
            />
            <SnippetButton
               label="Horizontal Rule"
               icon={<BiMoveHorizontal />}
               snippetItem={snippets.horizontalRule}
            />
         </Flex>
      </Flex>
   )
}

export default EditPanel
