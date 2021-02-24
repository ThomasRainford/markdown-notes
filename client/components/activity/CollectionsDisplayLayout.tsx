import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const CollectionsDisplayLayout: React.FC<Props> = ({ children }) => {
   return (
      <Flex direction="column" h="100%" w="25em" bg="brand.100" textColor="brand.900">
         {children}
      </Flex>
   )
}

export default CollectionsDisplayLayout
