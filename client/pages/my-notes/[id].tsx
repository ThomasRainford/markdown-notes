import { useRouter } from 'next/router'
import React from 'react'

interface Props {

}

const MyNotes = ({ }) => {

   const router = useRouter()

   console.log(router.query.id)

   return (
      <div>
         my notes page
      </div>
   )
}

export default MyNotes