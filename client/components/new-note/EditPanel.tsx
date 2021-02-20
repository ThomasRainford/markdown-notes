import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BiHeading, BiCodeAlt, BiMoveHorizontal } from 'react-icons/bi'
import { Ri4KFill } from 'react-icons/ri'
import { FiLink } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiFillCode } from 'react-icons/ai'
import { BsImage, BsBlockquoteLeft } from 'react-icons/bs'
import SnippetButton from './SnippetButton'
import SnippetButtonMenu from './SnippetButtonMenu'
import { snippets } from '../../utils/snippets'

interface Props {

}

const EditPanel = ({ }) => {

   return (
      <Flex direction="column" h="100%" w="5em" bg="#5CDB95">
         <Flex direction="column" align="center" pt="1em">
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
            {/* 
               // TODO: Table needs a popover to enter dimensions.
            <SnippetButtonMenu
               label="Table"
               icon={<AiFillCode />}
               snippetItem={snippets.code}
            /> */}
            <SnippetButton
               label="Block quote"
               icon={<BsBlockquoteLeft />}
            />
            <SnippetButton
               label="HTML Element"
               icon={<BiCodeAlt />}
            />
            <SnippetButton
               label="Horizontal Rule"
               icon={<BiMoveHorizontal />}
            />
         </Flex>
      </Flex>
   )
}

export default EditPanel
