import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { NoteLocation } from '../../types/types'

interface Props {
   location: NoteLocation
}

const NoteLocationBreadcrumb: React.FC<Props> = ({ location }) => {
   return (
      <Breadcrumb spacing={3} fontWeight="medium" textColor="brand.400" fontSize="lg" px="1em" mb="1em">
         <BreadcrumbItem>
            <BreadcrumbLink>{location.collection.title}</BreadcrumbLink>
         </BreadcrumbItem>
         <BreadcrumbItem>
            <BreadcrumbLink>{location.list.title}</BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   )
}

export default NoteLocationBreadcrumb
