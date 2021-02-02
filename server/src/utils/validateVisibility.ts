import { CollectionResponse } from "../resolvers/object-types/CollectionResponse"

export const validateVisibility = (visibility: string): CollectionResponse | null => {

   if (visibility !== 'public' && visibility !== 'private') {
      return {
         error: {
            property: 'visibility',
            message: 'Visibility can only be public or private.'
         }
      }
   }

   return null

}