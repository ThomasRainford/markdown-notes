import { useRouter } from "next/router"
import { useEffect } from "react"
import { UseQueryState } from "urql"
import { MeQuery } from "../generated/graphql"

export const useIsAuth = (user: UseQueryState<MeQuery, object>) => {

   const router = useRouter()

   useEffect(() => {
      //console.log('isAuth: ', user)
      // Check if user is logged.
      if (!user.fetching && !user.data?.me) {
         router.replace('/account/login')
      }
   }, [user, router])
}