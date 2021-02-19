import { Flex } from '@chakra-ui/react'
import React from 'react'
import { snippets } from '../../utils/snippets'

interface Props {

}

const EditPanel = ({ }) => {

   const table = snippets.table.create(3, 3)
   console.log(table)

   return (
      <Flex direction="column" h="100%" w="5em" bg="#5CDB95">
         hello
      </Flex>
   )
}

export default EditPanel
