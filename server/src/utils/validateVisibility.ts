import { Error } from '../resolvers/object-types/Error'

export const validateVisibility = (visibility: string): Error | null => {

   if (visibility !== 'public' && visibility !== 'private') {
      return {
         property: 'visibility',
         message: 'Visibility can only be public or private.'
      }
   }

   return null

}