import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BiHeading } from 'react-icons/bi'
import { Ri4KFill } from 'react-icons/ri'
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
               handleClick={() => {

               }}
            />
            <SnippetButtonMenu
               label="Emphasis"
               icon={<Ri4KFill />}
               snippetItem={snippets.emphasis}
               handleClick={() => {

               }}
            />
         </Flex>
      </Flex>
   )
}

export default EditPanel
