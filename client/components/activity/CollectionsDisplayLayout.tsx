import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const CollectionsDisplayLayout: React.FC<Props> = ({ children }) => {
   return (
      <Flex direction="column" h="100%" w="20em" bg="#5CDB95" textColor="#05386B">
         {children}
      </Flex>
   )
}

export default CollectionsDisplayLayout
