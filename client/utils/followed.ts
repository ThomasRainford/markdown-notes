import { UseQueryState } from "urql"
import { MeQuery, UserQuery } from "../generated/graphql"

export const followed = (user: UseQueryState<MeQuery, object>, profileUser: UseQueryState<UserQuery, object>): boolean => {
   return user.data?.me?.following.includes(profileUser.data?.user?.id)
}