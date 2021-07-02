import { UseQueryState } from "urql"
import { MeQuery, UserQuery } from "../generated/graphql"

// Check if the current profile is owned by the user logged in.
export const isMyProfile = (user: UseQueryState<MeQuery, object>, profileUser: UseQueryState<UserQuery, object>): boolean => {
   if (user.data?.me?._id === profileUser.data?.user?.id) {
      return true
   }
   return false
}