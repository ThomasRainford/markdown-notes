import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { NoteLocation } from '../../types/types'

interface Props {
   location: NoteLocation
}

const NoteLocationBreadcrumb: React.FC<Props> = ({ location }) => {
   return (
      <Breadcrumb spacing={3} fontWeight="medium" fontSize="md" p="1em">
         <BreadcrumbItem>
            <BreadcrumbLink href="#">{location.collection.title}</BreadcrumbLink>
         </BreadcrumbItem>

         <BreadcrumbItem>
            <BreadcrumbLink href="#">{location.list.title}</BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   )
}

export default NoteLocationBreadcrumb
